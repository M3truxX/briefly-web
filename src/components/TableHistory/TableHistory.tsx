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
            const response = await repository.updateUserLinkEntry(user?.token!!, shortLink, !linkStatus)
            toast.success(Success.STATUS_LINK_ALTERADO)
            handleToggleGet(currentPage);
        } catch (error) {
            toast.error(Errors.STATUS_LINK_ALTERADO)
        }
    };

    // Função para deletar o link
    const handleDeleteLink = async (shortLink: string) => {
        try {
            const response = await repository.deleteUserLinkEntry(user?.token!!, shortLink)
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
        event.stopPropagation(); // Impede a propagação do evento para o botão do acordeão
        setSelectedLink(link);
        setModalVisibleInfo(true);
    };

    // Fecha o modal info
    const closeModalInfo = () => {
        setModalVisibleInfo(false);
    };

    return (
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
                            <div className={`accordion-content pbl-30${openStates[link.shortLink] ? '' : 'open'}`}>
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
                {selectedLink && (
                    <>
                        <p className="mb-40 color-primary font-bold">Visitas Totais: {selectedLink.totalVisits.length}</p>
                        <ul className="mb-30">
                            {selectedLink.totalVisits.map((visit, index) => (
                                <li className="list-remove mb-15 mi-20" key={index}>
                                    {visit.deviceInfo.deviceType} - {visit.region.city}, {visit.region.country} - {formatDate(visit.clickedAt)}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Modal>
        </div >
    );
};

export default TableHistory;