import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Briefcase, Calendar, User, File } from 'lucide-react'

const SidebarCaregiver: React.FC = () => {
    return (
        <aside className="w-64 bg-white shadow-md p-4">
            <nav className="space-y-2">
                <Link to="/dashboard-caregiver" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <Home className="w-5 h-5 mr-2" />
                    Tableau de bord
                </Link>
                <Link to="/my-services" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Mes services
                </Link>
                <Link to="/dashboard-caregiver/reservations" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <Calendar className="w-5 h-5 mr-2" />
                    Prestations à venir
                </Link>
                <Link to="/profile-CareGiver" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <User className="w-5 h-5 mr-2" />
                    Profil
                </Link>
                <Link to="/profile-CareGiver" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                    <File className="w-5 h-5 mr-2" />
                    Mes documents
                </Link>
            </nav>
        </aside>
    )
}

export default SidebarCaregiver
