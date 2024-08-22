// Importa bibliotecas necessárias
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Erro from './pages/Erro/Error';
import Protected from './pages/ProtectedPage/ProtectedPage';
import Cover from './components/Cover/Cover';
import Rodape from './components/Rodape/Rodape';
import Register from './pages/Register/Register';

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
            </Routes>
            <Rodape />
        </BrowserRouter>
    )
}

export default RoutApp;