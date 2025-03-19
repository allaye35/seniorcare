import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage: React.FC = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', code: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalide').required("L'email est requis"),
            code: Yup.string().required('Le code est requis'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:4000/api/auth/verify-email', values);
                setMessage(response.data.message);
                navigate('/login');
            } catch (err) {
                setMessage(err.response?.data?.message || 'Erreur lors de la vérification.');
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
            <div className="w-full max-w-md bg-white p-6 shadow-md rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">Vérification de l'email</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
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
                    <div>
                        <label htmlFor="code" className="block mb-1 font-medium">Code de vérification</label>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.code && formik.errors.code && (
                            <div className="text-red-500 text-sm">{formik.errors.code}</div>
                        )}
                    </div>
                    {message && <div className="text-red-500 text-sm">{message}</div>}
                    <button
                        type="submit"
                        className="w-full bg-rose-500 text-white font-semibold py-2 rounded"
                    >
                        Vérifier
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmailPage;