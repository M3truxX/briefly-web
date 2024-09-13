// Importa bibliotecas necessárias
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Erro from './pages/Erro/Error';
import Protected from './pages/Protected/Protected';
import Header from './components/Header/Header';
import Rodape from './components/Rodape/Rodape';
import Register from './pages/Register/Register';
import ActivatePage from './pages/ActivatePage/ActivatePage';
import LoginPage from './pages/LoginPage/LoginPage';
import perfilPage from './pages/PerfilPage/PerfilPage';
import { LoggedRoute, PublicRoute } from './protectedRoute';
import HistoryPage from './pages/Historico/HistoryPage';
import InactivatePage from './pages/InactivatePage/InactivatePage';
import { useAppContext } from './contexts/AppContext';
import { useEffect } from 'react';
import ReportPage from './pages/ReportPage/ReportPage';
import EditImagePage from './pages/EditImagePage/EditImagePage';

// Componente que define as rotas da aplicação
function RoutApp() {
    const { user, session } = useAppContext(); // Use o contexto geral

    useEffect(() => {
        if (user) {
            session()
        }
    }, [])

    return (
        <BrowserRouter>
            <div>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Erro />} />
                    <Route path='/inactive' element={<InactivatePage />} />
                    <Route path='/report' element={<ReportPage />} />
                    <Route path="/register" element={<PublicRoute component={Register} />} />
                    <Route path="/protected/:id" element={<PublicRoute component={Protected} />} />
                    <Route path="/expired/:email" element={<PublicRoute component={ActivatePage} />} />
                    <Route path="/activated/" element={<PublicRoute component={ActivatePage} />} />
                    <Route path="/login" element={<PublicRoute component={LoginPage} />} />
                    <Route path="/historico" element={<LoggedRoute component={HistoryPage} />} />
                    <Route path="/editImage" element={<LoggedRoute component={EditImagePage} />} />
                    <Route path="/perfil" element={<LoggedRoute component={perfilPage} />} />
                </Routes>
                <Rodape />
            </div>
        </BrowserRouter>
    )
}

export default RoutApp;