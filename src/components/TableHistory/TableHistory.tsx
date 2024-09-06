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

const TableHistory: React.FC = () => {
    // Estado para controlar quais links estão abertos
    const { user, repository } = useAppContext(); // Use o contexto geral
    const [links, setLinks] = useState<LinkEntry[]>(); // Estado para armazenar os links
    const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual
    const [totalPages, setTotalPages] = useState(0); // Estado para o total de páginas

    useEffect(() => {
        handleToggleGet(1);
    }, [])

    // Alterna o estado de aberto/fechado para um link específico
    const toggleCollapse = (shortLink: string) => {
        setOpenStates((prev) => ({
            ...prev,
            [shortLink]: !prev[shortLink], // Alterna o estado do link específico
        }));
    };


    // função para receber dados de historico atualizado
    const handleToggleGet = async (page: number) => {
        setIsLoading(true);
        try {
            const response: GetHistoryDataResponse = await repository.updateHistory(user?.token!!, page, 5);
            if (response) {
                setLinks(response.linkEntryList);
                setTotalPages(response.paginationResponse.totalPages);
            }
        } catch (error) {
            toast(Errors.ERRO_RECEBER_HISTORICO);
        } finally {
            setIsLoading(false);
        }
    };

    // Função para ativar/desativar o link
    const handleToggleActive = async (shortLink: string, linkStatus: boolean) => {
        try {
            const response = await repository.updateUserLinkEntry(user?.token!!, shortLink, !linkStatus)
            toast(Success.STATUS_LINK_ALTERADO)
            handleToggleGet(currentPage);
        } catch (error) {
            toast(Errors.STATUS_LINK_ALTERADO)
        }
    };

    // Função para deletar o link
    const handleDeleteLink = async (shortLink: string) => {
        try {
            const response = await repository.deleteUserLinkEntry(user?.token!!, shortLink)
            toast(Success.LINK_DELETADO)
            handleToggleGet(currentPage);
        } catch (error) {
            toast(Errors.LINK_DELETADO)
        }
    };

    // Função encurtar os links removendo prefixos
    function truncateUserName(name: string, maxLength: number): string {
        const cleanedName = name.replace(/^(https?:\/\/)?(www\.)?/, '');
        if (cleanedName.length <= maxLength) return cleanedName;
        return cleanedName.slice(0, maxLength) + '...';
    }

    // Funções para mudar a página
    const handleNextPage = () => {
        setIsLoading(false)
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            handleToggleGet(nextPage);
        }
    };

    const handlePreviousPage = () => {
        setIsLoading(true)
        if (currentPage > 1) {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage)
            handleToggleGet(previousPage);
        };
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
            <h1 className={`fs-24 font-bold color-primary mb-20`}>Histórico de links</h1>
            <div className="accordion-links sombras">
                {isLoading ? (<Loading />) : (
                    (links || []).map((link) => (
                        <div key={link.shortLink}>
                            <div>
                                <button onClick={() => toggleCollapse(link.shortLink)} // Alterna apenas o acordeom clicado
                                    className={`acordion-button pbl-10 ${openStates[link.shortLink] ? 'open' : ''}`}>
                                    <span className="title-btn info-container-acordion font-bold">Link curto:
                                        <a className="link-mostrar-acordion ml-5" href={link.shortLink} target="blank">{truncateUserName(link.shortLink, 40)}</a>
                                    </span>
                                    <span className={`status ${link.active ? 'active' : 'inactive'}`}>
                                        {link.active ? '🟢' : '🔴'}
                                    </span>
                                </button>
                            </div>
                            <div className={`accordion-content pbl-30${openStates[link.shortLink] ? '' : 'open'}`}>
                                <div className='center'>
                                    <div>
                                        <div className='info-container-acordion'>
                                            <p className="color-dark font-bold">Link original:
                                                <a className="info-acordion ml-5" href={link.originalLink} target="blank">{truncateUserName(link.originalLink, 25)}</a>
                                            </p>
                                        </div>
                                        <div className='mt-2'>
                                            <p className="color-dark font-bold">Validade:
                                                <span className='color-primary info-acordion span-date ml-5'>{formatDate(link.expiresAt)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='button-container-acordion' >
                                        <button className={`toggle-button ml-20 ${link.active ? 'inactive' : 'active'}`}
                                            onClick={() => handleToggleActive(link.shortLink, link.active)}>
                                            {link.active ? 'Desativar' : 'Ativar'}
                                        </button>
                                        <button className="delete-button ml-20" onClick={() => handleDeleteLink(link.shortLink)}>
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div className="paginator-container mb-5">
                    <button
                        className="paginator-button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <span className="page-info">{`Página ${links?.length == 0 ? '0' : currentPage} de ${totalPages}`}</span>
                    <button
                        className="paginator-button"
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}>
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableHistory;