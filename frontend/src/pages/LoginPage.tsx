import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/auth';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { login, loading, error, emailNotVerified, resendVerificationEmail } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '', role: 'famille' as User['role'], remember: false },
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalide').required("L'email est requis"),
            password: Yup.string().required('Le mot de passe est requis'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                if (response.user.role === 'famille') {
                    navigate('/dashboard-family');
                } else if (response.user.role === 'aidant') {
                    navigate('/dashboard-caregiver');
                }
            } catch (err) {
                console.error(err);
            }
        },
    });

    const handleResendVerificationEmail = async () => {
        try {
            await resendVerificationEmail(formik.values.email);
            navigate('/verify-email');
        } catch (err) {
            console.error('Erreur lors de l’envoi de l’email de vérification:', err);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Rôle (radio boutons) */}
                    <div>
                        <label className="block mb-1 font-medium">Je suis :</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="famille"
                                    checked={formik.values.role === 'famille'}
                                    onChange={formik.handleChange}
                                    className="mr-1"
                                />
                                Famille
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="aidant"
                                    checked={formik.values.role === 'aidant'}
                                    onChange={formik.handleChange}
                                    className="mr-1"
                                />
                                Aidant
                            </label>
                        </div>
                    </div>

                    {/* Rester connecté + Mot de passe oublié ? */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formik.values.remember}
                                onChange={formik.handleChange}
                                className="mr-1"
                            />
                            Rester connecté
                        </label>

                        <Link to="/reset-password" className="text-sm text-blue-600 hover:underline">
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Erreur globale du hook */}
                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                            {emailNotVerified && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleResendVerificationEmail}
                                        className="text-blue-600 hover:underline ml-2"
                                    >
                                        Renvoyer l'email de vérification
                                    </button>
                                </div>
                            )}
                        </div>
                    )}



                    {/* Bouton Se connecter */}
                    <button
                        type="submit"
                        disabled={loading || !formik.isValid}
                        className="w-full bg-rose-500 text-white font-semibold py-2 rounded disabled:opacity-50"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                {/* Pas encore de compte ? S'enregistrer */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Pas encore de compte ?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        S’enregistrer
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;