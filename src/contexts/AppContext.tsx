import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoggedUserResponse } from '../data/models/interfaces/LoggedUserResponse';
import { LoggedDataRequest } from '../data/models/interfaces/LoggedDataRequest';
import { DatabaseRepository } from '../data/models/class/DatabaseRepository';

// Define o tipo para o contexto de autenticação
interface AppContextType {
    user: LoggedUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<LoggedUserResponse | null>>;
    login: (loginData: LoggedDataRequest) => Promise<LoggedUserResponse | undefined>;
    session: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    repository: DatabaseRepository;
    isAuthenticated: boolean;
}

// Cria o contexto com um valor inicial vazio
const AppContext = createContext<AppContextType | undefined>(undefined);

// Chave para armazenar os dados de autenticação no localStorage
const AUTH_STORAGE_KEY = 'authUserData';

// Componente do provedor de autenticação
export const AppProvider: React.FC<{ children: React.ReactNode, repository: DatabaseRepository }> = ({ children, repository }) => {
    const [user, setUser] = useState<LoggedUserResponse | null>(() => {
        // Recupera o usuário do localStorage quando o provedor é inicializado
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // Se o usuário estiver autenticado, salva no localStorage
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY); // Remove os dados se o usuário for deslogado
        }
    }, [user]);

    // Função de login
    const login = async (loginData: LoggedDataRequest): Promise<LoggedUserResponse | undefined> => {
        try {
            const response = await repository.loginUser(loginData);
            setUser(response); // Configura o estado do usuário
            return response; // Retorna a resposta
        } catch (error) {
            throw error; // Propaga o erro
        }
    };

    // Função para realizar o logout
    const logout = async (): Promise<void> => {
        try {
            await repository.signOutUser(user!!.token);
            setUser(null); // Limpa o estado do usuário
            localStorage.removeItem(AUTH_STORAGE_KEY); // Remove o usuário do localStorage
        } catch (error) {
            throw error;
        }
    };

    const session = async (): Promise<void> => {
        try {
            const response = await repository.sessionUser(user!!.token);
            if (!response) {
                throw new Error('Sessão inválida ou expirou.');
            }
            setUser(response);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response));
        } catch (error) {
            throw error;
        }
    };

    const isAuthenticated = !!user;

    // Retorna o provedor com os métodos e o estado
    return (
        <AppContext.Provider value={{ user, setUser, login, logout, session, isAuthenticated, repository }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook para acessar o contexto de autenticação
export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext deve ser usado dentro de um AuthProvider');
    }
    return context;
};