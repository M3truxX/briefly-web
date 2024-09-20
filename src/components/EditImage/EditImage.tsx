// Importações necessárias
import './editImage.scss';
import axios from 'axios';
import person from '../../img/person.png';
import { useAppContext } from '../../contexts/AppContext';
import React, { useEffect, useRef, useState } from 'react';
import CustonButtom from '../CustomButtom/CustonButtom';
import { UploadImageResponse } from '../../data/models/interfaces/UploadImageResponse';
import { EditImageProps } from '../../data/models/interfaces/EditImageProps';

// Componente para editar a imagem de perfil do usuário
const EditImage: React.FC<EditImageProps> = ({ onAxiosError }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Armazena o arquivo selecionado
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Armazena a URL da imagem de preview
    const [loading, setLoading] = useState<boolean | undefined>(false); // Controla o estado de carregamento
    const { user, setUser, repository } = useAppContext(); // Use o contexto geral

    // Ref para o input de arquivo
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Função para lidar com a mudança no input de arquivo
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            // Revoga a URL anterior se existir
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            const file = event.target.files[0];
            const objectUrl = URL.createObjectURL(file);
            setSelectedFile(file);
            setPreviewUrl(objectUrl);
        }
    };

    // Função para enviar a imagem selecionada para o servidor
    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        setLoading(true)
        const formData = new FormData();
        formData.append('media', selectedFile); // 'media' deve corresponder à chave usada no backend

        try {
            // Realiza a requisição e captura a resposta
            const linkDataResponse: UploadImageResponse = await repository.uploadUserImage(formData, user?.token!!);
            const newProfileImageUrl = linkDataResponse.fileLink; // Captura o novo link da imagem
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
                localStorage.setItem('auth_storage_key', JSON.stringify(updatedUser));

                // Atualiza o estado global do usuário
                setUser(updatedUser);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                onAxiosError(error); // Use a função de callback aqui
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
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const getImageSource = () => {
        if (previewUrl) return previewUrl;
        if (user && user.account.profileImageUrl !== '') return user.account.profileImageUrl;
        return person;
    };

    return (
        <div className='img-container'>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />
            <div className='img-edit-perfil mb-20' onClick={handleDivClick}>
                <img
                    className={`img-edit-perfil ${selectedFile && 'disable'}`}
                    src={getImageSource()}
                    alt="Imagem de perfil"
                />
            </div>
            <div className='img-btn-container'>
                <div>
                    <CustonButtom
                        text='descartar'
                        secondary={true}
                        onClick={handleCancelSelection} />
                </div>
                <div className='ml-10'>
                    <CustonButtom
                        text='Atualizar'
                        loading={loading}
                        activate={selectedFile !== null && !loading}
                        onClick={handleUpload} />
                </div>
            </div>
        </div>
    );
};

export default EditImage;