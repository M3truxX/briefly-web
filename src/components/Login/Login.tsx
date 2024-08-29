// LoginComponent.tsx

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoggedDataRequest } from '../../data/models/interfaces/LoggedDataRequest'

const LoginComponent: React.FC = () => {
    const { login } = useAuth(); // Hook para usar o contexto de autenticação
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função para lidar com o envio do formulário de login
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const loginData: LoggedDataRequest = { email, password };
        await login(loginData); // Chama o método de login do contexto
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginComponent;