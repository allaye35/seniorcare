import { useState, useEffect } from 'react'
import { FamilyProfile } from '../types/profile'
import { fetchFamilyProfile, updateFamilyProfile } from '../services/profileService'

export function useFamilyProfile() {
    const [profile, setProfile] = useState<FamilyProfile | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadProfile() {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchFamilyProfile()
                setProfile(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadProfile()
    }, [])

    async function saveProfile(updatedData: FamilyProfile) {
        setLoading(true)
        setError(null)
        try {
            const data = await updateFamilyProfile(updatedData)
            setProfile(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { profile, loading, error, saveProfile }
}
