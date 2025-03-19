import React from 'react'
import Layout from '../components/layout/Layout'
import {Calendar, FilePlus, AlertCircle, CheckCircle, PlusCircle} from 'lucide-react'
import {Link} from "react-router-dom";
import SidebarFamily from "../components/layout/SidebarFamily.tsx";
import SidebarCaregiver from "../components/layout/SidebarCaregiver.tsx";

// Ex. : un mock de services proposés et de réservations
const mockServices = [
    { id: 1, title: 'Aide au repas', description: 'Préparation et aide à la prise de repas.' },
    { id: 2, title: 'Compagnie et loisirs', description: 'Présence, conversation, jeux...' },
]

const upcomingPrestations = [
    { id: 1, service: 'Aide au repas', date: '2025-07-10', family: 'Famille Martin' },
    { id: 2, service: 'Compagnie et loisirs', date: '2025-07-12', family: 'Famille Dupont' },
]

const pendingRequests = [
    { id: 101, service: 'Sortie Parc', date: '2025-07-15', family: 'Famille Bernard' },
]

const DashboardCaregiver: React.FC = () => {
    return (
            <div className="flex">
                <SidebarCaregiver />
            <div className="flex-grow p-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Tableau de bord <span className="text-rose-600">Aidant</span>
                </h2>

                {/* Section : Aperçu rapide */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {/* Carte : Prochaines prestations */}
                    <div className="bg-white shadow rounded p-4">
                        <div className="flex items-center mb-2">
                            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">
                                Prochaines prestations
                            </h3>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Vous avez {upcomingPrestations.length} prestations planifiées.
                        </p>
                    </div>

                    {/* Carte : Demandes en attente */}
                    <div className="bg-white shadow rounded p-4">
                        <div className="flex items-center mb-2">
                            <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-700">
                                Demandes en attente
                            </h3>
                        </div>
                        <p className="text-gray-500 text-sm">
                            {pendingRequests.length} nouvelle(s) demande(s) de réservation.
                        </p>
                    </div>

                    {/* Bouton : Ajouter un service */}
                    <div className="bg-white shadow rounded p-4 flex flex-col items-start justify-center">
                        <Link
                            to="/services/create"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded inline-flex items-center"
                        >
                            <PlusCircle className="mr-2 w-5 h-5" />
                            Ajouter un service
                        </Link>
                        <p className="text-gray-500 text-sm mt-2">
                            Proposez un nouveau service pour aider davantage de familles.
                        </p>
                    </div>
                </div>

                {/* Section : Mes services */}
                <div className="bg-white shadow rounded p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Mes services proposés
                    </h3>
                    {mockServices.length > 0 ? (
                        <ul className="space-y-3">
                            {mockServices.map((srv) => (
                                <li
                                    key={srv.id}
                                    className="border-b pb-2 flex items-start justify-between"
                                >
                                    <div>
                                        <p className="text-gray-800 font-medium">{srv.title}</p>
                                        <p className="text-gray-500 text-sm">
                                            {srv.description}
                                        </p>
                                    </div>
                                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                                        Modifier
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Vous n’avez pas encore créé de service.</p>
                    )}
                </div>

                {/* Section : Prochaines prestations */}
                <div className="bg-white shadow rounded p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Prochaines prestations
                    </h3>
                    {upcomingPrestations.length > 0 ? (
                        <ul className="space-y-3">
                            {upcomingPrestations.map((res) => (
                                <li
                                    key={res.id}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div>
                                        <p className="text-gray-800 font-medium">{res.service}</p>
                                        <p className="text-gray-500 text-sm">
                                            Chez {res.family} - {res.date}
                                        </p>
                                    </div>
                                    <button className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded text-sm">
                                        Détails
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucune prestation planifiée.</p>
                    )}
                </div>

                {/* Section : Réservations en attente de confirmation */}
                <div className="bg-white shadow rounded p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Demandes en attente
                    </h3>
                    {pendingRequests.length > 0 ? (
                        <ul className="space-y-3">
                            {pendingRequests.map((req) => (
                                <li
                                    key={req.id}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div>
                                        <p className="text-gray-800 font-medium">{req.service}</p>
                                        <p className="text-gray-500 text-sm">
                                            Famille : {req.family} - Date proposée : {req.date}
                                        </p>
                                    </div>
                                    <div className="space-x-2">
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                                            Accepter
                                        </button>
                                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                                            Refuser
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucune demande en attente.</p>
                    )}
                </div>

                {/* Section : Historique (exemple) */}
                <div className="bg-white shadow rounded p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        Historique des prestations
                    </h3>
                    {/* On met juste un mock vide pour l’instant */}
                    <p className="text-gray-500 text-sm">
                        Vous n’avez pas encore d’historique.
                        Une fois les prestations terminées, vous pourrez les revoir ici.
                    </p>
                </div>
            </div>
            </div>
    )
}

export default DashboardCaregiver
