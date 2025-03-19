import React from 'react';
import { useMyServices } from '../hooks/useMyServices';
import SidebarCaregiver from '../components/layout/SidebarCaregiver';

const MyServicesPage: React.FC = () => {
    const { services, loading, error } = useMyServices();

    return (
        <div className="flex h-screen">
            <SidebarCaregiver />
            <div className="flex-grow max-w-4xl mx-auto p-6 overflow-auto">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Mes Services</h2>

                {loading && <p>Chargement...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && services.length === 0 && (
                    <p className="text-gray-600">Vous n'avez pas encore créé de services.</p>
                )}

                <ul className="space-y-4">
                    {services.map((service) => (
                        <li key={service.id} className="bg-white shadow rounded p-4">
                            <h3 className="text-lg font-bold">{service.title}</h3>
                            <p>{service.description}</p>
                            <p className="text-gray-600">{service.location}</p>
                            <p className="text-gray-500">
                                {service.availabilityDate} ({service.startTime} - {service.endTime})
                            </p>
                            <p className="text-gray-700 font-semibold">{service.price} €/h</p>
                            <p className="text-gray-500">
                                Proposé par : {service.caregiver.firstName} {service.caregiver.lastName}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyServicesPage;
