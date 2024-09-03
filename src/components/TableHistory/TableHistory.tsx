import "./tableHistory.scss";
import '../../utils/cssConf.scss';
import React from 'react';
import { useAppContext } from "../../contexts/AppContext";


const TableHistory: React.FC = () => {
    const { user, repository } = useAppContext(); // Use o contexto geral
    // Formata a data de expiração para exibição
    const formatDate = (date: string) => new Date(date).toLocaleDateString();


    function toggleActiveStatus(link: string) {
        console.log('isso aew"');
        
    }

    function deleteLink(link: string) {
        console.log('isso aew"');
        
    }

    function truncateUserName(name: string, maxLength: number): string {
        if (name.length <= maxLength) return name;
        const lastSpaceIndex = name.slice(0, maxLength).lastIndexOf(' ');
        const truncatedName = lastSpaceIndex !== -1 ? name.slice(0, lastSpaceIndex) : name.slice(0, maxLength);
        return truncatedName + '...';
    }


    return (
        <table className="link-table">
            <thead>
                <tr>
                    <th>Link Curto</th>
                    <th>Link Original</th>
                    <th>Status</th>
                    <th>Expira em</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {user?.account.linkEntryList.map((link) => (
                    <tr key={link.shortLink}>
                        <td>{link.shortLink}</td>
                        <td>{truncateUserName(link.originalLink, 37)}</td>
                        <td>{link.active ? 'Ativo' : 'Inativo'}</td>
                        <td>{formatDate(link.expiresAt)}</td>
                        <td>
                            <button
                                className={`btn ${link.active ? 'btn-desativar' : 'btn-ativar'}`}
                                onClick={() => toggleActiveStatus(link.shortLink)}
                            >
                                {link.active ? 'Desativar' : 'Ativar'}
                            </button>
                            <button className="btn btn-deletar" onClick={() => deleteLink(link.shortLink)}>
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableHistory;