import './editImage.scss';
import axios, { AxiosError } from 'axios';
import person from '../../img/person.png';
import { useAuth } from '../../contexts/AuthContext';
import { Errors } from '../../data/models/enums/Errors';
import { toast, ToastContainer } from 'react-toastify';
import { Success } from '../../data/models/enums/Success';
import React, { useEffect, useRef, useState } from 'react';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import CustonButtom from '../CustomButtom/CustonButtom';

const AUTH_STORAGE_KEY = 'auth_storage_key'; // Atualize conforme o nome real do seu key no localStorage.

export const EditImage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const { user, setUser } = useAuth(); // Use o contexto de autenticação

    // Ref para o input de arquivo
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Atualiza a prévia da imagem quando o arquivo selecionado muda
    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);

            // Limpa a URL criada quando o componente é desmontado ou o arquivo muda
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast(Errors.SELECT_ARQUIVO);
            return;
        }

        setLoading(true)
        const formData = new FormData();
        formData.append('media', selectedFile); // 'media' deve corresponder à chave usada no backend

        try {
            // Realiza a requisição e captura a resposta
            const response = await axios.post<{ filename: string; fileLink: string }>(
                'http://localhost:9098/media',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${user ? user.token : ''}`, // Inclui o token no cabeçalho de autorização
                    }
                }
            );
            const newProfileImageUrl = response.data.fileLink; // Captura o novo link da imagem
            // Atualiza o objeto `user` no localStorage
            if (user) {
                // Atualiza a URL da imagem no objeto `Account`
                const updatedUser = {
                    ...user,
                    account: {
                        ...user.account,
                        profileImageUrl: newProfileImageUrl,
                    },
                };

                // Salva o `user` atualizado no localStorage
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

                // Atualiza o estado global do usuário
                setUser(updatedUser);
                toast(Success.IMAGEM_ENVIADA);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {

                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 400) {
                    toast(Errors.ERRO_TIPO_IMG);
                } else if (axiosError.response?.status === 401) {
                    toast(Errors.ERRO_ENVIO_ARQUIVO);
                } else {
                    toast(Errors.SERVIDOR_NAO_RESPONDENDO);
                }
            }
        } finally {
            setLoading(false);
            handleCancelSelection()
        }
    };

    // Função para simular o clique no input de arquivo
    const handleDivClick = () => {
        if (!selectedFile && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Função para limpar a imagem selecionada
    const handleCancelSelection = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className='img-container'>
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
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />
            <h1 className={`fs-24 font-bold color-primary`}>Alterar a imagem</h1>
            <p className={`fs-14 mb-10 color-secondary`}>Click aqui</p>
            <div className='img-edit-perfil mb-20' onClick={handleDivClick}>

                <img
                    className={`img-edit-perfil ${selectedFile && 'disable'}`}
                    src={previewUrl ? previewUrl : person}
                    alt="Imagem de perfil"
                />
            </div>
            {selectedFile ? (
                <div className='img-btn-container'>
                    <div>
                        <CustonButtom
                            text='Cacelar'
                            secondary={true}
                            onClick={handleCancelSelection} />
                    </div>
                    <div className='ml-10'>
                        <CustonButtom
                            text='Enviar'
                            loading={loading}
                            onClick={handleUpload} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};