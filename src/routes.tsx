// Importa bibliotecas necessárias
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Erro from './pages/Erro/Error';
import Protected from './pages/Protected/Protected';
import Cover from './components/Header/Header';
import Rodape from './components/Rodape/Rodape';
import Register from './pages/Register/Register';
import ActivatePage from './pages/ActivatePage/ActivatePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { LoggedRoute, PublicRoute } from './protectedRoute';

// Componente que define as rotas da aplicação
function RoutApp() {
    return (
        <BrowserRouter>
            <Cover />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Erro />} />
                <Route path="/register" element={<PublicRoute component={Register} />} />
                <Route path="/protected/:id" element={<PublicRoute component={Protected} />} />
                <Route path="/expired/:email" element={<PublicRoute component={ActivatePage} />} />
                <Route path="/activated/" element={<PublicRoute component={ActivatePage} />} />
                <Route path="/login" element={<PublicRoute component={LoginPage} />} />
                <Route path="/historico" element={<LoggedRoute component={ActivatePage} />} />
                <Route path="/perfil" element={<LoggedRoute component={ActivatePage} />} />
            </Routes>
            <Rodape />
        </BrowserRouter>
    )
}

export default RoutApp;