import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Calendar, Search, User } from 'lucide-react'  // icônes d'exemple

const SidebarFamily: React.FC = () => {
    return (
        <aside className="w-64 bg-white shadow-md p-4">
            <nav className="space-y-2">
                <Link to="/dashboard-family" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <Home className="w-5 h-5 mr-2" />
                    Tableau de bord
                </Link>
                <Link to="/dashboard-family/reservations" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <Calendar className="w-5 h-5 mr-2" />
                    Mes réservations
                </Link>
                <Link to="/all-services" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher un service
                </Link>
                <Link to="/profile-family" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <User className="w-5 h-5 mr-2" />
                    Paramètre du compte
                </Link>
            </nav>
        </aside>
    )
}

export default SidebarFamily
