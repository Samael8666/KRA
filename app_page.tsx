'use client'

import { useState, useEffect } from 'react'
import { KRA, Area } from '@/types'
import KRASheet from '@/components/KRASheet'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [kras, setKRAs] = useState<KRA[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchKRAs()
    fetchAreas()
  }, [])

  const fetchKRAs = async () => {
    try {
      const response = await fetch('/api/kras')
      if (!response.ok) {
        throw new Error(`Failed to fetch KRAs: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      setKRAs(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching KRAs:', error)
      setError(`Failed to load KRAs: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setLoading(false)
    }
  }

  const fetchAreas = async () => {
    try {
      const response = await fetch('/api/areas')
      if (!response.ok) {
        throw new Error(`Failed to fetch areas: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      setAreas(data)
    } catch (error) {
      console.error('Error fetching areas:', error)
      setError(`Failed to load areas: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleActualChange = async (id: string, value: string) => {
    try {
      const response = await fetch(`/api/kras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ actual: value }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update KRA: ${response.status} ${response.statusText}`)
      }

      const updatedKRA = await response.json()
      setKRAs(kras.map(kra => kra._id === id ? updatedKRA : kra))
    } catch (error) {
      console.error('Error updating KRA:', error)
      setError(`Failed to update KRA: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => {fetchKRAs(); fetchAreas();}}>Retry</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Enhanced Sales KRA Sheet</CardTitle>
        <p className="text-center text-muted-foreground">Company Focus: Full Fledged Business Development Services and C2C IT Augmentation</p>
      </CardHeader>
      <CardContent>
        <KRASheet kras={kras} areas={areas} onActualChange={handleActualChange} />
      </CardContent>
    </Card>
  )
}