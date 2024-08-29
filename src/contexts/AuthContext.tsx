// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoggedUserResponse } from '../data/models/interfaces/LoggedUserResponse';
import { AuthenticationRepository } from '../data/repository/AuthenticationRepository';
import { LoggedDataRequest } from '../data/models/interfaces/LoggedDataRequest';
import { ApiService } from '../api/ApiService';

// Define o tipo para o contexto de autenticação
interface AuthContextType {
    user: LoggedUserResponse | null; // Usuário autenticado
    login: (loginData: LoggedDataRequest) => Promise<void>; // Método de login
    logout: () => void; // Método de logout
}

// Cria o contexto com um valor inicial vazio
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Chave para armazenar os dados de autenticação no localStorage
const AUTH_STORAGE_KEY = 'authUserData';

// Componente do provedor de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<LoggedUserResponse | null>(() => {
        // Recupera o usuário do localStorage quando o provedor é inicializado
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const authRepository = new AuthenticationRepository(new ApiService('http://localhost:9098')); // Instância do repositório de autenticação

    useEffect(() => {
        // Se o usuário estiver autenticado, salva no localStorage
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY); // Remove os dados se o usuário for deslogado
        }
    }, [user]);

    // Função para realizar o login
    const login = async (loginData: LoggedDataRequest) => {
        try {
            const loggedUserResponse = await authRepository.loginUser(loginData);
            setUser(loggedUserResponse); // Atualiza o estado do usuário
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            // Lidar com o erro de login, como exibir uma mensagem de erro
        }
    };

    // Função para realizar o logout
    const logout = () => {
        setUser(null); // Limpa o estado do usuário
        localStorage.removeItem(AUTH_STORAGE_KEY); // Remove o usuário do localStorage
    };

    // Retorna o provedor com os métodos e o estado
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto de autenticação
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
