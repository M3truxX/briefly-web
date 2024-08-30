import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const EditPerfil: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { user, logout } = useAuth(); // Use o contexto de autenticação

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
            const response = await axios.post('http://localhost:9098/media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user ? user.token : null}`, // Inclui o token no cabeçalho de autorização
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(progress);
                    } else {
                        setUploadProgress(0); // Ou qualquer outro valor padrão desejado
                    }
                },
            });

            setSuccessMessage('Imagem enviada com sucesso!');
        } catch (error: any) {
            setErrorMessage('Erro ao enviar imagem. Tente novamente.');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div>
            <h2>Upload de Imagem</h2>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}
            {uploadProgress !== null && <p>Progresso: {uploadProgress}%</p>}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Enviando...' : 'Enviar Imagem'}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default EditPerfil;
