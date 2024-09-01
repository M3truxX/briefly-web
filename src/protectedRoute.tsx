import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from './contexts/AppContext';

interface RouteProps {
    component: React.ComponentType<any>;
}

export const LoggedRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const { isAuthenticated } = useAppContext();
    return !isAuthenticated ? <Navigate to="/" replace /> : <Component />;
};

export const PublicRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const { isAuthenticated } = useAppContext(); // Verifica se o usuário está logado
    return isAuthenticated ? <Navigate to="/" replace /> : <Component />;
};