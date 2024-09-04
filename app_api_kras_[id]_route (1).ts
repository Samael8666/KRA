import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/mongodb'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const { actual } = await request.json()

    const result = await db.collection('kras').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: { actual: actual } },
      { returnDocument: 'after' }
    )

    if (!result.value) {
      return NextResponse.json({ error: 'KRA not found' }, { status: 404 })
    }

    // Recalculate achievement
    const kra = result.value
    const target = parseFloat(kra.target)
    const actualValue = parseFloat(actual)
    const achievement = (actualValue / target) * 100

    const updatedKRA = await db.collection('kras').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: { achievement: achievement } },
      { returnDocument: 'after' }
    )

    return NextResponse.json(updatedKRA.value)
  } catch (error) {
    console.error('Failed to update KRA:', error)
    return NextResponse.json({ error: 'Failed to update KRA' }, { status: 500 })
  }
}