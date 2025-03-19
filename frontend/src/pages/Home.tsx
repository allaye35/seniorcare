import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, Search, Edit, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 to-blue-50">
            {/* Hero / Section principale */}
            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-4xl w-full px-6 py-12 text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">
                        Senior<span className="text-rose-600">Care</span>
                    </h1>
                    <p className="text-gray-600 text-xl mb-6">
                        Caring for those who cared for us
                    </p>

                    <p className="text-gray-600 text-lg mb-10">
                        La plateforme qui connecte aidants professionnels ou particuliers formés
                        avec des familles ayant des proches âgés nécessitant de l’aide à domicile.
                    </p>

                    <div className="flex justify-center space-x-4 mb-10">
                        <Link
                            to="/login"
                            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded"
                        >
                            <Search className="mr-2 w-5 h-5" />
                            Trouver un service
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded"
                        >
                            <Edit className="mr-2 w-5 h-5" />
                            Proposer un service
                        </Link>
                    </div>

                    {/* Section 3 étapes */}
                    <section className="bg-white rounded shadow-lg p-6 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            Lancez-vous en 3 étapes faciles
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center">
                                <UserPlus className="w-12 h-12 text-rose-500 mb-2" />
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                                    1. Inscrivez-vous
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Pour commencer, décrivez vos besoins en matière de soins
                                    et créez un compte.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Edit className="w-12 h-12 text-rose-500 mb-2" />
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                                    2. Publiez une offre
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Recevez des candidatures ou examinez les profils locaux
                                    pour identifier les meilleurs aidants.
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <MessageCircle className="w-12 h-12 text-rose-500 mb-2" />
                                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                                    3. Connectez-vous
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Envoyez des messages, vérifiez les références et engagez
                                    la personne qui vous convient.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer (optionnel) */}
            <footer className="bg-white border-t text-center p-4 text-sm text-gray-500">
                © {new Date().getFullYear()} SeniorCare - Tous droits réservés.
            </footer>
        </div>
    );
}

export default Home;