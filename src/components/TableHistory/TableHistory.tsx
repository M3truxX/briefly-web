// AccordionLinks.tsx
import React, { useEffect, useState } from 'react';
import './tableHistory.scss';
import { useAppContext } from '../../contexts/AppContext';
import { formatDate } from "../../utils/formatDate";
import { toast, ToastContainer } from 'react-toastify';
import { Errors } from '../../data/models/enums/Errors';
import { LinkEntry } from '../../data/models/interfaces/LinkEntry';
import { Success } from '../../data/models/enums/Success';
import { GetHistoryDataResponse } from '../../data/models/interfaces/GetHistoryDataResponse ';
import Loading from '../Loading/Loading';
import Modal from "../Modal/Modal";
import CustonButtom from '../CustomButtom/CustonButtom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TableHistory: React.FC = () => {
    // Estado para controlar quais links estão abertos
    const { user, repository } = useAppContext(); // Use o contexto geral
    const [links, setLinks] = useState<LinkEntry[]>(); // Estado para armazenar os links
    const [linkSelected, setLinkSelected] = useState<string>() // Estado para armazenar o link selecionado
    const [openStates, setOpenStates] = useState<Record<string, boolean>>({}); // Estado para controlar quais links estão abertos
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
    const [totalPages, setTotalPages] = useState(0); // Estado para o total de páginas
    const [isModalVisible, setModalVisible] = useState(false); // Estado de visibilidade do modal
    const [isModalVisibleInfo, setModalVisibleInfo] = useState(false); // Estado de visibilidade do modal
    const [selectedLink, setSelectedLink] = useState<LinkEntry | null>(null); // Estado para armazenar o link selecionado
    const [isLoading, setIsLoading] = useState(true); // Inicializa como true para a primeira requisição
    const [isLoadingNextPage, setIsLoadingNextPage] = useState(false); // Estado para controlar o carregamento da próxima página
    const [isLoadingPreviousPage, setIsLoadingPreviousPage] = useState(false); // Estado para controlar o carregamento da página anterior

    // Estados para a paginação no modal
    const [currentPageModal, setCurrentPageModal] = useState(1);
    const itemsPerPage = 6;

    // Função para receber dados de historico atualizado
    useEffect(() => {
        handleToggleGet(1, true); // Indica que é a primeira chamada
    }, [])

    // Alterna o estado de aberto/fechado para um link específico
    const toggleCollapse = (shortLink: string) => {
        setOpenStates((prev) => ({
            ...prev,
            [shortLink]: !prev[shortLink], // Alterna o estado do link específico
        }));
    };

    // função para receber dados de historico atualizado
    const handleToggleGet = async (page: number, isFirstLoad: boolean = false) => {
        try {
            if (isFirstLoad) {
                setIsLoading(true);
            }
            const response: GetHistoryDataResponse = await repository.updateHistory(user?.token!!, page, 5);
            if (response) {
                setLinks(response.linkEntryList);
                setTotalPages(response.paginationResponse.totalPages);
                setCurrentPage(page);

                if (isFirstLoad) {
                    // Inicializa openStates apenas na primeira carga
                    const initialOpenStates: Record<string, boolean> = {};
                    response.linkEntryList.forEach(link => {
                        initialOpenStates[link.shortLink] = false;
                    });
                    setOpenStates(initialOpenStates);
                }
            }
        } catch (error) {
            toast.error(Errors.ERRO_RECEBER_HISTORICO);
        } finally {
            if (isFirstLoad) {
                setIsLoading(false);
            }
        }
    };

    // Função para ativar/desativar o link
    const handleToggleActive = async (shortLink: string, linkStatus: boolean) => {
        try {
            await repository.updateUserLinkEntry(user?.token!!, shortLink, !linkStatus)
            toast.success(Success.STATUS_LINK_ALTERADO)
            handleToggleGet(currentPage); // Chama handleToggleGet sem resetar openStates
        } catch (error) {
            toast.error(Errors.STATUS_LINK_ALTERADO)
        }
    };

    // Função para deletar o link
    const handleDeleteLink = async (shortLink: string) => {
        try {
            await repository.deleteUserLinkEntry(user?.token!!, shortLink)
            toast.success(Success.LINK_DELETADO)
            handleToggleGet(currentPage);
        } catch (error) {
            toast.error(Errors.LINK_DELETADO)
        }
    };

    // Função encurtar os links removendo prefixos
    function truncateUserName(name: string, maxLength: number): string {
        const cleanedName = name.replace(/^(https?:\/\/)?(www\.)?/, '');
        if (cleanedName.length <= maxLength) return cleanedName;
        return cleanedName.slice(0, maxLength) + '...';
    }

    // Função de proxima página
    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            setIsLoadingNextPage(true);
            try {
                const nextPage = currentPage + 1;
                await handleToggleGet(nextPage);
            } finally {
                setIsLoadingNextPage(false);
            }
        }
    };

    // Função de página anterior
    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            setIsLoadingPreviousPage(true);
            try {
                const previousPage = currentPage - 1;
                await handleToggleGet(previousPage);
            } finally {
                setIsLoadingPreviousPage(false);
            }
        }
    };

    // Abre o modal
    const openModal = (link: string) => {
        setLinkSelected(link);
        setModalVisible(true);
    };

    // Fecha o modal
    const closeModal = () => {
        setModalVisible(false);
    };

    // Abre o modal info
    const openModalInfo = (link: LinkEntry, event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedLink(link);
        setModalVisibleInfo(true);
    };

    // Fecha o modal info
    const closeModalInfo = () => {
        setModalVisibleInfo(false);
    };

    // Configuração do Toastify
    const configTosatify = () => (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );

    // Função para preparar dados para o gráfico de barras dos últimos 6 meses
    const getBarChartData = () => {
        const deviceCounts: Record<string, Record<string, number>> = {};
        const labels: string[] = [];

        // Obter a data atual
        const currentDate = new Date();

        // Gerar os rótulos para os últimos 6 meses
        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const label = `${month} ${year}`;
            labels.push(label);
            deviceCounts[label] = { desktop: 0, mobile: 0 };
        }

        // Verificar se selectedLink e suas visitas estão definidos
        if (selectedLink && selectedLink.totalVisits) {
            selectedLink.totalVisits.forEach(visit => {
                const visitDate = new Date(visit.clickedAt);
                const month = visitDate.toLocaleString('default', { month: 'short' });
                const year = visitDate.getFullYear();
                const label = `${month} ${year}`;

                // Verificar se a visita está dentro dos últimos 6 meses
                if (deviceCounts[label]) {
                    const deviceType = visit.deviceInfo.deviceType;
                    if (deviceType === 'desktop' || deviceType === 'mobile') {
                        deviceCounts[label][deviceType] += 1;
                    } else {
                        // Opcional: tratar outros tipos de dispositivos
                        deviceCounts[label][deviceType] = (deviceCounts[label][deviceType] || 0) + 1;
                    }
                }
            });
        }

        const desktopData = labels.map(label => deviceCounts[label].desktop);
        const mobileData = labels.map(label => deviceCounts[label].mobile);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Desktop',
                    data: desktopData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Mobile',
                    data: mobileData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    // Configuração do gráfico de barras
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Visitas por Tipo de Dispositivo nos Últimos 6 Meses',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Número de Visitas',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Dados por Meses',
                },
            },
        },
    };

    // Função para calcular as visitas a serem exibidas na página atual do modal
    const getCurrentVisits = () => {
        if (!selectedLink) return [];
        const startIndex = (currentPageModal - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return selectedLink.totalVisits.slice(startIndex, endIndex);
    };

    // Funções de navegação do paginador
    const handleNextPageModal = () => {
        if (currentPageModal < Math.ceil((selectedLink?.totalVisits.length || 0) / itemsPerPage)) {
            setCurrentPageModal(prev => prev + 1);
        }
    };

    const handlePreviousPageModal = () => {
        if (currentPageModal > 1) {
            setCurrentPageModal(prev => prev - 1);
        }
    };

    // Função para resetar a página do modal quando um novo link for selecionado
    useEffect(() => {
        setCurrentPageModal(1);
    }, [selectedLink]);

    return (
        <div>
            {configTosatify()}
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div>
                    <h1 className={`fs-20 font-bold color-primary mbl-20`}>Tem certeza que deseja deletar?</h1>
                    <a href={linkSelected} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
                        {linkSelected}
                    </a>
                    <div className='status-btn-container mt-20'>
                        <div>
                            <CustonButtom
                                text='Cancelar'
                                onClick={closeModal}
                                secondary={true}
                                btnHeight={35}
                                btnWidth={90} />
                        </div>
                        <div className='ml-10'>
                            <CustonButtom
                                text="Deletar"
                                activate={true}
                                onClick={() => { closeModal(); handleDeleteLink(linkSelected ?? '') }}
                                btnHeight={35}
                                btnWidth={90} />
                        </div>
                    </div>
                </div>
            </Modal>
            <h1 className={`fs-24 font-bold color-primary mb-20`}>Histórico de links</h1>
            <div className="accordion-links sombras">
                {isLoading ? (<Loading />) : (
                    (links || []).map((link) => (
                        <div key={link.shortLink}>
                            <div>
                                <button onClick={() => toggleCollapse(link.shortLink)} // Alterna apenas o acordeom clicado
                                    className={`acordion-button pbl-10 ${openStates[link.shortLink] ? 'open' : ''}`}>
                                    <span className="title-btn info-container-acordion font-bold">Link curto:
                                        <a className="link-mostrar-acordion ml-5" href={link.shortLink} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
                                            {truncateUserName(link.shortLink, 40)}
                                        </a>
                                    </span>
                                    <button
                                        onClick={(event) => openModalInfo(link, event)}
                                        style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                                        <span className="font-bold detalhes-btn">Detalhes</span>
                                    </button>
                                    <span className={`status ${link.active ? 'active' : 'inactive'}`}>
                                        {link.active ? '🟢' : '🔴'}
                                    </span>
                                </button>
                            </div>
                            <div className={`accordion-content ${openStates[link.shortLink] ? 'open' : ''}`}>
                                <div className='center'>
                                    <div className='info-container-acordion'>
                                        <div>
                                            <p className="color-dark font-bold">Link original:
                                                <a className="info-acordion ml-5" href={link.originalLink} target="_blank" rel="noopener noreferrer">{truncateUserName(link.originalLink, 25)}</a>
                                            </p>
                                        </div>
                                        <div className='mt-2'>
                                            <p className="color-dark font-bold">Validade:
                                                <span className='color-primary font-normal ml-5'>{formatDate(link.expiresAt)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='button-container-acordion' >
                                        <button className={`toggle-button ml-20 ${link.active ? 'inactive' : 'active'}`}
                                            onClick={() => handleToggleActive(link.shortLink, link.active)}>
                                            {link.active ? 'Desativar' : 'Ativar'}
                                        </button>
                                        <button className="delete-button ml-20" onClick={() => openModal(link.shortLink)}>
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div className="paginator-container mb-10">
                    <CustonButtom
                        text="Anterior"
                        activate={!(currentPage === 1)}
                        loading={isLoadingPreviousPage}
                        onClick={handlePreviousPage}
                        btnHeight={35}
                        btnWidth={90} />
                    <span className="page-info">{`Página ${links?.length === 0 ? '0' : currentPage} de ${totalPages}`}</span>
                    <CustonButtom
                        text="Próxima"
                        activate={!(currentPage >= totalPages)}
                        onClick={handleNextPage}
                        loading={isLoadingNextPage}
                        btnHeight={35}
                        btnWidth={90} />
                </div>
            </div >
            {/* Modal de informações */}
            <Modal isVisible={isModalVisibleInfo} onClose={closeModalInfo}>
                {selectedLink ? (
                    <div>
                        <p className="color-primary font-bold">Visitas Totais: {selectedLink.totalVisits.length}</p>
                        <Bar className='mb-40' data={getBarChartData()} options={barOptions} />
                        <ul className="mb-30">
                            {getCurrentVisits().map((visit, index) => (
                                <li className="list-remove mb-15 mi-20" key={index}>
                                    {visit.deviceInfo.deviceType} - {visit.region.city}, {visit.region.country} - {formatDate(visit.clickedAt)}
                                </li>
                            ))}
                        </ul>
                        {/* Paginador */}
                        <div className="paginator-modal">
                            <CustonButtom
                                text="Anterior"
                                activate={currentPageModal > 1} // Ativo se não for a primeira página
                                onClick={handlePreviousPageModal}
                                btnHeight={35}
                                btnWidth={90} />
                            <span className="paginator-info mi-10">
                                Página {currentPageModal} de {Math.ceil((selectedLink?.totalVisits.length || 0) / itemsPerPage)}
                            </span>
                            <CustonButtom
                                text="Próxima"
                                activate={currentPageModal < Math.ceil((selectedLink?.totalVisits.length || 0) / itemsPerPage)} // Ativo se não for a última página
                                onClick={handleNextPageModal}
                                btnHeight={35}
                                btnWidth={90} />
                        </div>
                    </div>
                ) : (
                    <p>Carregando informações...</p>
                )}
            </Modal>
        </div >
    );
};

export default TableHistory;