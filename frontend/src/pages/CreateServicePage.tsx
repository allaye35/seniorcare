import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useCreateService} from '../hooks/useCreateService'
import {CreateServicePayload} from '../types/service'
import Layout from '../components/layout/Layout'
import {useNavigate} from 'react-router-dom'
import SidebarFamily from "../components/layout/SidebarFamily.tsx";
import SidebarCaregiver from "../components/layout/SidebarCaregiver.tsx";


const validationSchema = Yup.object({
    title: Yup.string()
        .required('Le titre est requis')
        .min(5, 'Le titre doit contenir au moins 5 caractères'),
    description: Yup.string()
        .required('La description est requise')
        .min(10, 'La description doit contenir au moins 10 caractères'),
    type: Yup.string().required('Le type de service est requis'),
    location: Yup.string().required('La localisation est requise'),
    availabilityDate: Yup.string().required('La date est requise'),
    startTime: Yup.string().required("L'heure de début est requise"),
    endTime: Yup.string().required("L'heure de fin est requise"),
    price: Yup.number().required('Le prix est requis').min(0, 'Le prix doit être positif'),
})

const CreateServicePage: React.FC = () => {
    const {publishService, loading, error, serviceCreated} = useCreateService()
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            type: '',
            location: '',
            availabilityDate: '',
            startTime: '',
            endTime: '',
            price: 0,
        },
        validationSchema,
        onSubmit: async (values) => {
            const payload: CreateServicePayload = {...values}
            try {
                await publishService(payload)
                setTimeout(() => {
                    navigate('/my-services'); // Redirection après succès
                }, 3000);
            } catch (err) {
                console.error(err)
            }
        },
    })

    return (
            <div className="flex">
                <SidebarCaregiver />
                <div className="flex-grow max-w-2xl mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                        Publier un nouveau service
                    </h2>

                    {serviceCreated && (
                        <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded mb-4">
                            Votre service a été publié avec succès !
                        </div>
                    )}

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded">
                        {/* Titre, Description, Type, Localisation ... */}
                        {/* Champ Titre */}
                        <div>
                            <label htmlFor="title" className="block mb-1 font-medium">
                                Titre du service
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <div className="text-red-500 text-sm">{formik.errors.title}</div>
                            )}
                        </div>
                        {/* Répéter pour description, type, location... */}

                        {/* Disponibilité - Date */}
                        <div>
                            <label htmlFor="availabilityDate" className="block mb-1 font-medium">
                                Date de disponibilité
                            </label>
                            <input
                                id="availabilityDate"
                                name="availabilityDate"
                                type="date"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.availabilityDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.availabilityDate && formik.errors.availabilityDate && (
                                <div className="text-red-500 text-sm">{formik.errors.availabilityDate}</div>
                            )}
                        </div>

                        {/* Heure de début */}
                        <div>
                            <label htmlFor="startTime" className="block mb-1 font-medium">
                                Heure de début
                            </label>
                            <input
                                id="startTime"
                                name="startTime"
                                type="time"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.startTime && formik.errors.startTime && (
                                <div className="text-red-500 text-sm">{formik.errors.startTime}</div>
                            )}
                        </div>

                        {/* Heure de fin */}
                        <div>
                            <label htmlFor="endTime" className="block mb-1 font-medium">
                                Heure de fin
                            </label>
                            <input
                                id="endTime"
                                name="endTime"
                                type="time"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.endTime}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.endTime && formik.errors.endTime && (
                                <div className="text-red-500 text-sm">{formik.errors.endTime}</div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block mb-1 font-medium">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <div className="text-red-500 text-sm">{formik.errors.description}</div>
                            )}
                        </div>

                        {/* Type de service */}
                        <div>
                            <label htmlFor="type" className="block mb-1 font-medium">
                                Type de service
                            </label>
                            <select
                                id="type"
                                name="type"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="Repas">Repas</option>
                                <option value="Compagnie">Compagnie</option>
                                <option value="Soins">Soins</option>
                            </select>
                            {formik.touched.type && formik.errors.type && (
                                <div className="text-red-500 text-sm">{formik.errors.type}</div>
                            )}
                        </div>

                        {/* Localisation */}
                        <div>
                            <label htmlFor="location" className="block mb-1 font-medium">
                                Localisation
                            </label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.location && formik.errors.location && (
                                <div className="text-red-500 text-sm">{formik.errors.location}</div>
                            )}
                        </div>

                        {/* Prix */}
                        <div>
                            <label htmlFor="price" className="block mb-1 font-medium">
                                Prix (€/h)
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.price && formik.errors.price && (
                                <div className="text-red-500 text-sm">{formik.errors.price}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !formik.isValid}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded disabled:opacity-50"
                        >
                            {loading ? 'Publication...' : 'Publier le service'}
                        </button>
                    </form>
                </div>
            </div>
    )
}

export default CreateServicePage
