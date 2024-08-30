import React, { useEffect, useRef, useState } from 'react';
import './editImage.scss';
import axios from 'axios';
import person from '../../img/person.png';
import { useAuth } from '../../contexts/AuthContext';

const AUTH_STORAGE_KEY = 'auth_storage_key'; // Atualize conforme o nome real do seu key no localStorage.

const EditImage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
            setErrorMessage('Selecione um arquivo para enviar');
            return;
        }

        setUploading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        setUploadProgress(null);

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
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadProgress(progress);
                        } else {
                            setUploadProgress(0); // Ou qualquer outro valor padrão desejado
                        }
                    },
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
                handleCancelSelection()
                setSuccessMessage('Imagem enviada com sucesso!');
            }
        } catch (error: any) {
            setErrorMessage('Erro ao enviar imagem. Tente novamente.');
            console.error(error);
        } finally {
            setUploading(false);
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
        setErrorMessage(null);
        setSuccessMessage(null);
        setUploadProgress(null);
    };

    // Função para parar a propagação do clique na sobreposição
    const stopClickPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div>
            <div className="img-edit-perfil" onClick={handleDivClick}>
                <img
                    className="img-edit-perfil"
                    src={previewUrl ? previewUrl : person}
                    alt="Imagem de perfil"
                />
                {/* Exibe a sobreposição apenas se houver um arquivo selecionado */}
                {selectedFile && (
                    <div className="sobre-enviar" onClick={stopClickPropagation}>
                        <div className="aceitar-envio" onClick={handleUpload} />
                        <div className="recusar-envio" onClick={handleCancelSelection} />
                    </div>
                )}
            </div>
            {/* Input de arquivo escondido */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />
            {uploadProgress !== null && <p>Progresso: {uploadProgress}%</p>}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Enviando...' : 'Enviar Imagem'}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default EditImage;
