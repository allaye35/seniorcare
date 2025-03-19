import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ requiredRole?: string }> = ({ requiredRole }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
