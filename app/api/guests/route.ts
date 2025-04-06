import { NextRequest, NextResponse } from 'next/server';
import Guest from '@/models/Guest';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();
    
    // Get all guests
    const guests = await Guest.find({}).sort({ name: 1 });
    
    return NextResponse.json(guests, { status: 200 });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Connect to the database
    await connectDB();
    
    // Create a new guest
    const newGuest = new Guest(body);
    await newGuest.save();
    
    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    console.error("Error creating guest:", error);
    return NextResponse.json({ error: "Failed to create guest" }, { status: 500 });
  }
} 