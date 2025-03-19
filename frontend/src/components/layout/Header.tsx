import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="flex items-center justify-between bg-white shadow px-6 py-3">
            {/* Logo */}
            <div className="text-3xl font-bold text-gray-800">
                <Link to="/">
                    Senior<span className="text-rose-600">Care</span>
                </Link>
            </div>

            {user ? (
                <nav className="flex items-center space-x-4">
                    <span className="text-gray-700">Bonjour, {user.firstName || user.email}</span>
                    <button className="relative text-gray-600 hover:text-rose-600">
                        <Bell className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-rose-600 font-medium"
                    >
                        Se déconnecter
                    </button>
                </nav>
            ) : (
                <nav className="space-x-4">
                    <Link
                        to="/login"
                        className="text-gray-600 hover:text-rose-600 font-medium"
                    >
                        Se connecter
                    </Link>
                    <Link
                        to="/signup"
                        className="text-white bg-rose-500 hover:bg-rose-600 py-2 px-4 rounded font-medium"
                    >
                        S’inscrire
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;