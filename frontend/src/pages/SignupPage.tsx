import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
    const { signup, loading, error } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState<'famille' | 'aidant'>('famille');

    const formik = useFormik({
        initialValues: { firstName: '', lastName: '', email: '', password: '' },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Le prénom est requis'),
            lastName: Yup.string().required('Le nom est requis'),
            email: Yup.string().email('Email invalide').required("L'email est requis"),
            password: Yup.string().min(6, '6 caractères minimum').required('Le mot de passe est requis'),
        }),
        onSubmit: async (values) => {
            try {
                await signup({ ...values, role } as User);
                navigate('/verify-email');
            } catch (err) {
                console.error(err);
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
            <div className="w-full max-w-md bg-white p-6 shadow-md rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">Créer un compte</h2>

                {/* Toggle Rôle : Famille ou Aidant */}
                <div className="flex space-x-4 mb-6 justify-center">
                    <button
                        type="button"
                        className={`px-4 py-2 rounded ${
                            role === 'famille' ? 'text-white bg-rose-500 hover:bg-rose-600  font-medium' : 'bg-gray-200'
                        }`}
                        onClick={() => setRole('famille')}
                    >
                        Famille
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded ${
                            role === 'aidant' ? 'text-white bg-rose-500 hover:bg-rose-600  font-medium' : 'bg-gray-200'
                        }`}
                        onClick={() => setRole('aidant')}
                    >
                        Aidant
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Prénom */}
                    <div>
                        <label htmlFor="firstName" className="block mb-1 font-medium">
                            Prénom
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                        )}
                    </div>

                    {/* Nom */}
                    <div>
                        <label htmlFor="lastName" className="block mb-1 font-medium">
                            Nom
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Champs spécifiques si role = aidant */}
                    {role === 'aidant' && (
                        <div>
                            <label htmlFor="document" className="block mb-1 font-medium">
                                Document (PDF, images...)
                            </label>
                            <input
                                id="document"
                                name="document"
                                type="file"
                                className="w-full"
                            />
                        </div>
                    )}

                    {/* Erreur globale du hook */}
                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading || !formik.isValid}
                        className="w-full bg-rose-500 text-white font-semibold py-2 rounded disabled:opacity-50"
                    >
                        {loading ? 'En cours...' : 'S’inscrire'}
                    </button>
                </form>

                {/* Lien pour se connecter si déjà membre */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Vous êtes déjà membre ?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;