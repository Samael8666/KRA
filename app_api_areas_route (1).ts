import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const areas = await db.collection('areas').find({}).toArray()
    return NextResponse.json(areas)
  } catch (error) {
    console.error('Failed to fetch areas:', error)
    return NextResponse.json({ error: 'Failed to fetch areas' }, { status: 500 })
  }
}