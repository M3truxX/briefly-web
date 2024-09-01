import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoggedUserResponse } from '../data/models/interfaces/LoggedUserResponse';
import { LoggedDataRequest } from '../data/models/interfaces/LoggedDataRequest';
import { DatabaseRepository } from '../data/models/class/DatabaseRepository';
import { AppContextProps } from '../data/models/interfaces/AppContextProps';

// Cria o contexto com um valor inicial vazio
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Chave para armazenar os dados de autenticação no localStorage
const AUTH_STORAGE_KEY = 'authUserData';

// Função utilitária para manipular o localStorage
const useLocalStorage = (key: string) => {
    const getItem = () => JSON.parse(localStorage.getItem(key) || 'null');
    const setItem = (value: any) => localStorage.setItem(key, JSON.stringify(value));
    const removeItem = () => localStorage.removeItem(key);

    return { getItem, setItem, removeItem };
};

// Componente do provedor de autenticação
export const AppProvider: React.FC<{ children: React.ReactNode; repository: DatabaseRepository }> = ({
    children,
    repository,
}) => {
    const { getItem, setItem, removeItem } = useLocalStorage(AUTH_STORAGE_KEY);
    const [user, setUser] = useState<LoggedUserResponse | null>(() => getItem());

    useEffect(() => {
        if (user) setItem(user);
    }, [user, setItem]);

    // Função de login
    const login = async (loginData: LoggedDataRequest): Promise<LoggedUserResponse | undefined> => {
        try {
            const response = await repository.loginUser(loginData);
            setUser(response);
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Função para realizar o logout
    const logout = async (): Promise<void> => {
        setUser(null);
        removeItem();
        try {
            await repository.signOutUser(user?.token ?? '');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    // Função para verificar a sessão
    const session = async (): Promise<void> => {
        try {
            const response: LoggedUserResponse = await repository.sessionUser(user?.token ?? '');
            if (!response) throw new Error('Sessão inválida ou expirou.');
            setUser(response);
            setItem(response);
        } catch (error) {
            console.error('Session error:', error);
            throw error;
        }
    };

    const isAuthenticated = Boolean(user);

    // Retorna o provedor com os métodos e o estado
    return (
        <AppContext.Provider value={{ user, setUser, login, logout, session, isAuthenticated, repository }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook para acessar o contexto de autenticação
export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext deve ser usado dentro de um AuthProvider');
    }
    return context;
};