import { useState, useEffect } from 'react'
import { CaregiverProfile } from '../types/profile'
import { fetchProfile, updateProfile } from '../services/profileService'

export function useProfile() {
    const [profile, setProfile] = useState<CaregiverProfile | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadProfile() {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchProfile()
                setProfile(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadProfile()
    }, [])

    async function saveProfile(updatedData: CaregiverProfile) {
        setLoading(true)
        setError(null)
        try {
            const data = await updateProfile(updatedData)
            setProfile(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { profile, loading, error, saveProfile }
}
