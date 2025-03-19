import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { useServiceDetails } from '../hooks/useServiceDetails';

const ReservationDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { service, loading, error } = useServiceDetails(id);

    const handleReservation = () => {
        // Logique pour valider la réservation
        console.log('Réservation confirmée !');
        navigate('/dashboard-family');
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Détails du Service</h2>
            {service && (
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-bold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                        <MapPin className="w-4 h-4 mr-1 text-rose-500" />
                        {service.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4 mr-1 text-blue-500" />
                        {service.availabilityDate} ({service.startTime} - {service.endTime})
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                        <strong>Aidant :</strong> {service.caregiver.firstName} {service.caregiver.lastName}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                        <strong>Prix :</strong> {service.price} €/h
                    </p>

                    {/* Formulaire de réservation */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleReservation();
                        }}
                        className="mt-4"
                    >
                        <label htmlFor="message" className="block mb-2 font-medium">
                            Message pour l’aidant
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Ajoutez un message (facultatif)..."
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                        >
                            Confirmer la réservation
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ReservationDetailsPage;
