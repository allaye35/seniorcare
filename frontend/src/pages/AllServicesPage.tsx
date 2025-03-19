import React, { useState } from 'react';
import { useAllServices } from '../hooks/useAllServices';
import { MapPin, Clock, Filter, DollarSign } from 'lucide-react';
import SidebarFamily from '../components/layout/SidebarFamily';
import {Link} from "react-router-dom";

const AllServicesPage: React.FC = () => {
    const { services, loading, error } = useAllServices();

    // États pour les filtres
    const [filters, setFilters] = useState({
        location: '',
        serviceType: '',
        availabilityDate: '',
        startTime: '',
        endTime: '',
        maxPrice: '', // Nouveau filtre pour le prix
    });

    // Fonction pour mettre à jour les filtres
    const updateFilter = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Services filtrés
    const filteredServices = services.filter((service) => {
        const location = service.location ? service.location.toLowerCase() : '';
        const filterLocation = filters.location ? filters.location.toLowerCase() : '';

        const isLocationMatch =
            filterLocation === '' || location.includes(filterLocation);
        const isServiceTypeMatch =
            filters.serviceType === '' || service.type === filters.serviceType;

        // Filtre par date
        const isDateMatch =
            filters.availabilityDate === '' ||
            new Date(service.availabilityDate).toISOString().split('T')[0] === filters.availabilityDate;

        // Filtre par plage horaire
        const isTimeMatch =
            (filters.startTime === '' || service.startTime >= filters.startTime) &&
            (filters.endTime === '' || service.endTime <= filters.endTime);

        // Filtre par prix
        const isPriceMatch =
            filters.maxPrice === '' || service.price <= parseFloat(filters.maxPrice);

        return isLocationMatch && isServiceTypeMatch && isDateMatch && isTimeMatch && isPriceMatch;
    });

    return (
        <div className="flex">
            <SidebarFamily />
            <div className="flex-grow max-w-6xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                    <Filter className="inline-block w-6 h-6 mr-2 text-rose-600" />
                    Tous les Services
                </h2>

                {/* Message de chargement ou d'erreur */}
                {loading && <p className="text-gray-500 mb-4">Chargement des services...</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}

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

                        {/* Type de service */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700" htmlFor="serviceType">
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

                        {/* Disponibilité - Date */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700" htmlFor="availabilityDate">
                                Date de disponibilité
                            </label>
                            <input
                                id="availabilityDate"
                                type="date"
                                value={filters.availabilityDate}
                                onChange={(e) => updateFilter('availabilityDate', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        {/* Plage horaire */}
                        <div className="grid grid-cols-2 gap-4 md:col-span-2">
                            <div>
                                <label className="block mb-1 font-medium text-gray-700" htmlFor="startTime">
                                    Heure de début
                                </label>
                                <input
                                    id="startTime"
                                    type="time"
                                    value={filters.startTime}
                                    onChange={(e) => updateFilter('startTime', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700" htmlFor="endTime">
                                    Heure de fin
                                </label>
                                <input
                                    id="endTime"
                                    type="time"
                                    value={filters.endTime}
                                    onChange={(e) => updateFilter('endTime', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        {/* Prix maximum */}
                        <div>
                            <label className="block mb-1 font-medium text-gray-700" htmlFor="maxPrice">
                                Prix maximum (€/h)
                            </label>
                            <input
                                id="maxPrice"
                                type="number"
                                min="0"
                                value={filters.maxPrice}
                                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Ex : 50"
                            />
                        </div>
                    </div>
                </div>

                {/* Liste des services filtrés */}
                <div className="grid md:grid-cols-3 gap-6">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                            <div key={service.id} className="bg-white shadow rounded p-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">{service.title}</h3>
                                <p className="text-gray-500 text-sm mb-2">{service.description}</p>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                                    {service.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                    {service.availabilityDate} ({service.startTime} - {service.endTime})
                                </div>
                                <p className="text-sm text-gray-700 mt-2">
                                    <strong>Aidant :</strong> {service.caregiver.firstName} {service.caregiver.lastName}
                                </p>
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>Prix :</strong> {service.price} €/h
                                </p>
                                <Link
                                    to={`/services/${service.id}/reservation`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-2 rounded text-sm"
                                >
                                    Réserver
                                </Link>

                            </div>
                        ))
                    ) : (
                        !loading && (
                            <p className="text-gray-500">Aucun service ne correspond aux filtres.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllServicesPage;
