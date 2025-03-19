import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Layout from '../components/layout/Layout'
import { useFamilyProfile } from '../hooks/useFamilyProfile'
import { FamilyProfile } from '../types/profile'
import SidebarCaregiver from "../components/layout/SidebarCaregiver.tsx";
import SidebarFamily from "../components/layout/SidebarFamily.tsx";

const validationSchema = Yup.object({
    firstName: Yup.string().required('Le prénom est requis'),
    lastName: Yup.string().required('Le nom est requis'),
    email: Yup.string().email('Email invalide').required("L'email est requis"),
    phone: Yup.string(),
    photoUrl: Yup.string().nullable(),
    preferredLocation: Yup.string(),
    serviceTypes: Yup.array().of(Yup.string()),
})

const ProfileFamilyPage: React.FC = () => {
    const { profile, loading, error, saveProfile } = useFamilyProfile()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: profile?.firstName || '',
            lastName: profile?.lastName || '',
            email: profile?.email || '',
            phone: profile?.phone || '',
            photoUrl: profile?.photoUrl || '',
            preferredLocation: profile?.preferences?.preferredLocation || '',
            serviceTypes: profile?.preferences?.serviceTypes || [] as string[],
        },
        validationSchema,
        onSubmit: async (values) => {
            if (profile) {
                const updatedProfile: FamilyProfile = {
                    ...profile,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    photoUrl: values.photoUrl,
                    preferences: {
                        preferredLocation: values.preferredLocation,
                        serviceTypes: values.serviceTypes,
                    },
                }
                await saveProfile(updatedProfile)
            }
        },
    })

    // Gestion du changement pour serviceTypes
    const handleServiceTypeChange = (type: string) => {
        const current: string[] = formik.values.serviceTypes
        if (current.includes(type)) {
            formik.setFieldValue('serviceTypes', current.filter(t => t !== type))
        } else {
            formik.setFieldValue('serviceTypes', [...current, type])
        }
    }
    return (
            <div className="flex">
                <SidebarFamily />
            <div className="flex-grow max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">Profil Famille</h2>

                {loading && <p>Chargement...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {profile && (
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

                        {/* Téléphone */}
                        <div>
                            <label htmlFor="phone" className="block mb-1 font-medium">
                                Téléphone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                            )}
                        </div>
                        {/* Préférences */}
                        <div>
                            <label htmlFor="preferredLocation" className="block mb-1 font-medium">
                                Localisation préférée
                            </label>
                            <input
                                id="preferredLocation"
                                name="preferredLocation"
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={formik.values.preferredLocation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.preferredLocation && formik.errors.preferredLocation && (
                                <div className="text-red-500 text-sm">{formik.errors.preferredLocation}</div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Types de service préférés
                            </label>
                            <div className="flex items-center space-x-4">
                                {['Repas', 'Compagnie', 'Soins'].map(type => (
                                    <label key={type} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="serviceTypes"
                                            value={type}
                                            checked={formik.values.serviceTypes.includes(type)}
                                            onChange={() => handleServiceTypeChange(type)}
                                            className="mr-1"
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Photo de profil */}
                        <div>
                            <label htmlFor="photo" className="block mb-1 font-medium">
                                Photo de profil
                            </label>
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                accept="image/*"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                onChange={(event) => {
                                    const file = event.currentTarget.files?.[0]
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            formik.setFieldValue('photoUrl', reader.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                            {formik.values.photoUrl && (
                                <img
                                    src={formik.values.photoUrl as string}
                                    alt="Prévisualisation"
                                    className="mt-2 h-20 w-20 object-cover rounded-full"
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !formik.isValid}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded disabled:opacity-50"
                        >
                            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                    </form>
                )}
            </div>
            </div>
    )
}

export default ProfileFamilyPage
