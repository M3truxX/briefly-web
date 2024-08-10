import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Erro from './pages/Erro/Error';
import Protected from './pages/ProtectedPage/ProtectedPage';

function RoutApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Erro />} />
                <Route path="/protected/:id" element={<Protected />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutApp;