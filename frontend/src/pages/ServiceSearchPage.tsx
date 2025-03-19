import React from 'react'
import Layout from '../components/layout/Layout'
import { useServices } from '../hooks/useServices'
import { MapPin, Clock, Filter } from 'lucide-react'
import {Link} from "react-router-dom";
import SidebarFamily from "../components/layout/SidebarFamily.tsx";

const ServiceSearchPage: React.FC = () => {
    const {
        filteredServices,
        loading,
        error,
        filters,
        updateFilter,
    } = useServices()

    return (
            <div className="flex">
                <SidebarFamily />
            <div className="max-w-6xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    <Filter className="inline-block w-6 h-6 mr-2 text-rose-600" />
                    Recherche de services
                </h2>

                {/* Éventuel message d'erreur ou spinner */}
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {loading && <div className="text-gray-500 mb-4">Chargement des services...</div>}

                {/* Filtres */}
                <div className="bg-white shadow p-4 rounded mb-6">
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Localisation */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700" htmlFor="location">
                                Localisation
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={filters.location}
                                onChange={(e) => updateFilter('location', e.target.value)}
                                placeholder="Ex : Paris, Lyon..."
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        {/* Disponibilité */}
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700"
                                htmlFor="availability"
                            >
                                Disponibilité
                            </label>
                            <select
                                id="availability"
                                value={filters.availability}
                                onChange={(e) => updateFilter('availability', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">-- Choisir --</option>
                                <option value="Matin">Matin</option>
                                <option value="Après-midi">Après-midi</option>
                                <option value="Matin & Après-midi">Matin & Après-midi</option>
                            </select>
                        </div>

                        {/* Type de service */}
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700"
                                htmlFor="serviceType"
                            >
                                Type de service
                            </label>
                            <select
                                id="serviceType"
                                value={filters.serviceType}
                                onChange={(e) => updateFilter('serviceType', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">-- Choisir --</option>
                                <option value="Repas">Repas</option>
                                <option value="Compagnie">Compagnie</option>
                                <option value="Soins">Soins</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des services filtrés */}
                <div className="grid md:grid-cols-3 gap-6">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((srv) => (
                            <div key={srv.id} className="bg-white rounded shadow p-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                                    {srv.title}
                                </h3>
                                <p className="text-gray-500 text-sm">{srv.description}</p>
                                <div className="flex items-center text-sm text-gray-600 mt-2">
                                    <MapPin className="w-4 h-4 mr-1 text-rose-500" />
                                    {srv.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                    {srv.availability}
                                </div>
                                <p className="text-sm text-gray-700 mt-2">
                                    <strong>Aidant : </strong> {srv.caregiverName}
                                </p>
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>Prix : </strong> {srv.price} €/h
                                </p>
                                <Link
                                    to={`/services/${srv.id}/reserve`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-2 rounded text-sm"
                                >
                                    Réserver
                                </Link>
                            </div>
                        ))
                    ) : (
                        !loading && ( // On n’affiche “aucun service” que si ce n’est pas en cours de chargement
                            <p className="text-gray-500">
                                Aucun service ne correspond aux filtres.
                            </p>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default ServiceSearchPage
