import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/contexts/AuthContext';

interface RouteProps {
    component: React.ComponentType<any>;
}

export const LoggedRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <Navigate to="/" replace /> : <Component />;
};

export const PublicRoute: React.FC<RouteProps> = ({ component: Component }) => {
    const { isAuthenticated } = useAuth(); // Verifica se o usuário está logado
    return isAuthenticated ? <Navigate to="/" replace /> : <Component />;
};