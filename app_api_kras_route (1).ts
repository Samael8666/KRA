import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    const kras = await db.collection('kras').find({}).toArray()
    return NextResponse.json(kras)
  } catch (error) {
    console.error('Failed to fetch KRAs:', error)
    return NextResponse.json({ error: 'Failed to fetch KRAs' }, { status: 500 })
  }
}