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

// Componente que define as rotas da aplicação
function RoutApp() {
    return (
        <BrowserRouter>
            <Cover />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Erro />} />
                <Route path="/register" element={<Register />} />
                <Route path="/protected/:id" element={<Protected />} />
                <Route path="/expired/:email" element={<ActivatePage />} />
                <Route path="/activated/" element={<ActivatePage />} />
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
            <Rodape />
        </BrowserRouter>
    )
}

export default RoutApp;