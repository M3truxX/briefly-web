// Importações necessárias
import './EditPerfil.scss';
import '../../utils/cssConf.scss'
import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import CustonInputText from '../CustonInputText/CustonInputText';
import CustonButtom from '../CustomButtom/CustonButtom';
import { toast, ToastContainer } from 'react-toastify';
import { Errors } from '../../data/models/enums/Errors';
import { Success } from '../../data/models/enums/Success';
import { validationName, validationPhone, validationSenha } from '../../utils/validation';
import axios, { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../../data/models/interfaces/AxiosErroResponse';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import InputCode from '../InputCode/InputCode';
import { UserProfileConfirmRequest } from '../../data/models/interfaces/UserProfileConfirmRequest';
import EditImage from '../EditImage/EditImage';

// Componente para edição de informações do usuário
function EditUserInfo() {

    // Hooks e estados
    const { user, setUser, repository } = useAppContext(); // Contexto da aplicação
    const navigate = useNavigate(); // Hook de navegação
    const [axiosErrorImage, setAxiosErrorImage] = useState<AxiosError<AxiosErrorResponse> | null>(null); // Estado para armazenar erros do componente EditImage

    // Estados para controle de inputs e comportamento
    const [phone, setPhone] = useState(''); // Estado do input de telefone
    const [name, setName] = useState(''); // Estado do input de nome
    const [resetEntPhone, setResetEntPhone] = useState(false); // Estado de reset do input de telefone
    const [resetEntNome, setResetEntNome] = useState(false); // Estado de reset do input de nome
    const [controlEntPhone, setControlEntPhone] = useState(0); // Estado de controle do input de telefone
    const [controlEntNome, setControlEntNome] = useState(0); // Estado de controle do input de nome
    const [isModalVisible, setModalVisible] = useState(false); // Estado de visibilidade do modal

    const [activateNameButton, setActivateNameButton] = useState(false); // Estado de ativação do botão de atualizar nome
    const [activatePhoneButton, setActivatePhoneButton] = useState(false); // Estado de ativação do botão de atualizar telefone

    const [isLoadingName, setIsLoadingName] = useState(false); // Estado de carregamento do input de nome
    const [isLoadingPhone, setIsLoadingPhone] = useState(false); // Estado de carregamento do input de telefone

    // Funções para manipulação de inputs
    const entradaPhone = (text: string) => { setPhone(text); checkInputPhone(text); } // Função para manipular o input de telefone
    const entradaNome = (text: string) => { setName(text); checkInputNome(text); } // Função para manipular o input de nome

    // Efeito para validar os campos e ativar os botões individualmente
    useEffect(() => {
        setActivateNameButton(name.trim() !== '' && checkInputNome(name));
        setActivatePhoneButton(phone.trim() !== '' && checkInputPhone(phone));
    }, [phone, name]);

    useEffect(() => {
        if (axiosErrorImage) {
            if (axiosErrorImage.response?.status === 400) {
                toast.error(Errors.ERRO_TIPO_IMG);
            } else if (axiosErrorImage.response?.status === 401) {
                toast.error(Errors.ERRO_ENVIO_ARQUIVO);
            } else {
                toast.error(Errors.SERVIDOR_NAO_RESPONDENDO);
            }
        }
    }, [axiosErrorImage]);

    // Função para verificar a validade do nome
    const checkInputNome = (nome: string) => {
        if (nome === '') {
            setControlEntNome(0);
            return false;
        } else if (validationName(nome)) {
            setControlEntNome(2);
            return true;
        }
        setControlEntNome(1);
        return false;
    };

    // Função para verificar a validade do número de telefone
    const checkInputPhone = (numero: string) => {
        if (numero === '') {
            setControlEntPhone(0);
            return false;
        } else if (validationPhone(numero)) {
            setControlEntPhone(2);
            return true;
        }
        setControlEntPhone(1);
        return false;
    };

    // Função para lidar com erros do Axios do componente EditImage
    const handleAxiosError = useCallback((error: AxiosError<AxiosErrorResponse> | null) => {
        setAxiosErrorImage(error);
    }, []);

    // Função para lidar com o envio do formulário (atualizada)
    const handleSubmit = async (field: 'name' | 'phone') => {
        if ((field === 'name' && !activateNameButton) || (field === 'phone' && !activatePhoneButton)) return;

        const setLoading = field === 'name' ? setIsLoadingName : setIsLoadingPhone;
        setLoading(true);

        try {
            const updateData: any = {};
            if (field === 'name' && name) updateData.name = name;
            if (field === 'phone' && phone) updateData.phone = "55" + phone.replace(/[^0-9]/g, '');

            const updatedAccount = await repository.updateUserProfile(user?.token || '', updateData);

            if (field === 'name') {
                if (updatedAccount) {
                    toast.success(Success.USER_UPDATE_SUCCESS);
                    setResetEntNome(prev => !prev);
                    setName('');
                    setControlEntNome(0);

                    // Atualiza os dados do usuário logado
                    const updatedUserData = await repository.sessionUser(user?.token || '');
                    setUser(prevUser => ({
                        ...prevUser!,
                        account: updatedUserData
                    }));
                }
            } else {
                openModal();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<AxiosErrorResponse>;
                if (axiosError.response?.status === 429) {
                    toast.error(Errors.MUITAS_REQUISCOES);
                } else {
                    toast.error(Errors.SERVIDOR_NAO_RESPONDENDO);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    // Função para navegar para a página inicial
    const handleClickHome = () => {
        navigate('/');
    };

    // Abre o modal
    const openModal = () => {
        setModalVisible(true);
    };

    // Fecha o modal
    const closeModal = () => {
        setModalVisible(false);
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

    // Função para lidar com a mudança de valores no input de código
    const handleInputChange = useCallback((values: string[]) => {
        if (values.length === 6 && values.every(valor => valor !== "")) {
            const codigo = parseInt(values.join(''), 10);
            const confirmationData: UserProfileConfirmRequest = {
                name: name || undefined,
                phone: phone ? ("55" + phone.replace(/[^0-9]/g, '')) as string : undefined,
                validationCode: codigo
            };

            repository.confirmUserProfileUpdate(user?.token || '', confirmationData)
                .then(() => {
                    toast.success(Success.USER_UPDATE_SUCCESS);
                    closeModal();
                    setResetEntNome(prev => !prev);
                    setResetEntPhone(prev => !prev);
                    setControlEntPhone(0);
                    setControlEntNome(0);
                })
                .catch((error: any) => {
                    if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<AxiosErrorResponse>;
                        if (axiosError.response?.status === 403) {
                            toast.error(Errors.CODIGO_INVALIDO);
                        } else if (axiosError.response?.status === 429) {
                            toast.error(Errors.MUITAS_REQUISCOES);
                        } else {
                            toast.error(Errors.SERVIDOR_NAO_RESPONDENDO);
                        }
                    }
                });
        }
    }, [name, phone, repository, user]);

    // Modal para digitar o código de verificação
    const modal = () => (
        <Modal isVisible={isModalVisible} onClose={closeModal} disableClose={true}>
            <div className='mbl-20'>
                <h1 className="fs-20 font-bold color-primary">Digite o código de verificação:</h1>
                <p className="fs-14 mb-20 color-secondary">Insira o código que você recebeu no seu whatsapp</p>
                <InputCode quantidade={6} onInputChange={handleInputChange} />
                <div className='mt-20'>
                    <CustonButtom
                        text='Cancelar'
                        onClick={closeModal}
                    />
                </div>
            </div>
        </Modal>
    );

    // Renderização do componente
    return (
        <div className='edit-user-info-container'>
            {configTosatify()}
            {modal()}
            <h1 className="fs-24 font-bold color-primary">Editar Informações do Usuário</h1>
            <p className="fs-14 color-secondary">Preencha os campos que deseja alterar</p>
            <div className='edit-user-info-form'>
                <div className='edit-user-info-form mt-30'>
                    <p className='color-primary mb-10 fs-14 font-bold'>Alterar foto de perfil</p>
                    <div>
                        <EditImage
                            onAxiosError={handleAxiosError}
                        />
                    </div>
                    <p className='color-primary mb-10 fs-14 font-bold mt-30'>Digite seu novo nome de usuário</p>
                    <div className='input-container-perfil'>
                        <CustonInputText
                            textPlaceholder="Novo nome de usuário"
                            estado={controlEntNome}
                            travelInfo={entradaNome}
                            resetText={resetEntNome}
                            showTextdescription={controlEntNome === 1}
                            textdescription='Deve conter no mínimo 5 caracteres'
                        />
                        <div className='ml-10'>
                            <CustonButtom
                                type="button"
                                text="Atualizar"
                                activate={activateNameButton}
                                loading={isLoadingName}
                                onClick={() => handleSubmit('name')} />
                        </div>
                    </div>
                    <p className='color-primary mb-10 fs-14 font-bold mt-30'>Novo número de telefone</p>
                    <div className='input-container-perfil'>
                        <CustonInputText
                            textPlaceholder="Seu telefone"
                            estado={controlEntPhone}
                            travelInfo={entradaPhone}
                            resetText={resetEntPhone}
                            showTextdescription={controlEntPhone === 1}
                            textdescription='Preencha o número corretamente. Exemplo: (81) 98888-8888'
                            mask="phone"
                            lengthMax={14}
                            keyBoard='numeric'
                        />
                        <div className='ml-10'>
                            <CustonButtom
                                type="button"
                                text="Atualizar"
                                activate={activatePhoneButton}
                                loading={isLoadingPhone}
                                onClick={() => handleSubmit('phone')} />
                        </div>
                    </div>
                </div>
                <div className="edit-user-info-buttons mt-20">
                    <CustonButtom
                        text='Cancelar'
                        onClick={handleClickHome}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditUserInfo;