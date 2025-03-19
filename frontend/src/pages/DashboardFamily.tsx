import React from 'react'
import Layout from '../components/layout/Layout'
import { PlusCircle, Calendar, CheckCircle } from 'lucide-react'
import {Link} from "react-router-dom";
import SidebarFamily from "../components/layout/SidebarFamily.tsx";

const DashboardFamily: React.FC = () => {
    // Mock de réservations en cours
    const upcomingReservations = [
        { id: 1, service: 'Aide au repas', date: '2025-07-10', caregiver: 'Marie Dupont' },
        { id: 2, service: 'Compagnie et jeux', date: '2025-07-12', caregiver: 'Alex Martin' },
    ]

    // Mock d’un historique de réservations
    const pastReservations = [
        { id: 11, service: 'Ménage léger', date: '2025-06-20', caregiver: 'Lucie Bernard' },
        { id: 12, service: 'Sortie Parc', date: '2025-06-15', caregiver: 'Georges Petit' },
    ]

    return (
            <div className="flex">
                <SidebarFamily />
            <div className="flex-grow p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Tableau de bord <span className="text-rose-600">Famille</span>
                </h2>

                {/* Section : Aperçu rapide */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {/* Carte : Prochaines réservations */}
                    <div className="bg-white shadow rounded p-4">
                        <div className="flex items-center mb-2">
                            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">
                                Prochaines réservations
                            </h3>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Vous avez {upcomingReservations.length} réservations planifiées.
                        </p>
                    </div>

                    {/* Carte : Services réservés ce mois-ci */}
                    <div className="bg-white shadow rounded p-4">
                        <div className="flex items-center mb-2">
                            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">
                                Services réservés
                            </h3>
                        </div>
                        <p className="text-gray-500 text-sm">
                            5 services réservés ce mois-ci.
                        </p>
                    </div>

                    {/* Bouton rapide : Réserver un service */}
                    <div className="bg-white shadow rounded p-4 flex flex-col items-start justify-center">
                        <Link
                            to="/services/search"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-flex items-center"
                        >
                            <PlusCircle className="mr-2 w-5 h-5" />
                            Réserver un service
                        </Link>
                        <p className="text-gray-500 text-sm mt-2">
                            Besoin d’aide ? Réservez rapidement un service adapté.
                        </p>
                    </div>
                </div>

                {/* Section : Réservations à venir */}
                <div className="bg-white shadow rounded p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Mes réservations à venir
                    </h3>
                    {upcomingReservations.length > 0 ? (
                        <ul className="space-y-3">
                            {upcomingReservations.map((res) => (
                                <li
                                    key={res.id}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div>
                                        <p className="text-gray-800 font-medium">{res.service}</p>
                                        <p className="text-gray-500 text-sm">
                                            Avec {res.caregiver} - {res.date}
                                        </p>
                                    </div>
                                    <button className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded text-sm">
                                        Détails
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucune réservation à venir.</p>
                    )}
                </div>

                {/* Section : Historique */}
                <div className="bg-white shadow rounded p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Historique des réservations
                    </h3>
                    {pastReservations.length > 0 ? (
                        <ul className="space-y-3">
                            {pastReservations.map((res) => (
                                <li
                                    key={res.id}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div>
                                        <p className="text-gray-800 font-medium">{res.service}</p>
                                        <p className="text-gray-500 text-sm">
                                            Avec {res.caregiver} - {res.date}
                                        </p>
                                    </div>
                                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                                        Voir
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucun historique disponible.</p>
                    )}
                </div>

                {/* Section : Recommandations (exemple) */}
                <div className="bg-white shadow rounded p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Recommandations
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                        Nous vous suggérons ces services complémentaires pour faciliter votre quotidien.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Livraison de courses
            </span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Aide au bain
            </span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Soins infirmiers
            </span>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default DashboardFamily
