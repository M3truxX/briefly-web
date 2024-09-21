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

// Componente que define as rotas da aplicação
function RoutApp() {
    const { user, session } = useAppContext(); // Use o contexto geral

    // Efeito para verificar se o usuário está logado e chamar a função de sessão
    useEffect(() => {
        if (user) {
            session()
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='*' element={<Erro />} />
                        <Route path='/404/' element={<Erro />} />
                        <Route path='/inactive' element={<InactivatePage />} />
                        <Route path='/report' element={<ReportPage />} />
                        <Route path="/protected/:id" element={<Protected/>} />
                        <Route path="/register" element={<PublicRoute component={Register} />} />
                        <Route path="/expired/:email" element={<PublicRoute component={ActivatePage} />} />
                        <Route path="/activated/" element={<PublicRoute component={ActivatePage} />} />
                        <Route path="/login" element={<PublicRoute component={LoginPage} />} />
                        <Route path="/historico" element={<LoggedRoute component={HistoryPage} />} />
                        <Route path="/perfil" element={<LoggedRoute component={perfilPage} />} />
                    </Routes>
                </main>
                <Rodape />
            </div>
        </BrowserRouter>
    )
}

export default RoutApp;