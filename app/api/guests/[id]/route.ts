import { NextRequest, NextResponse } from 'next/server';
import Guest from '@/models/Guest';
import connectDB from '@/lib/mongodb';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    // Connect to the database
    await connectDB();
    
    // Find guest by ID
    const guest = await Guest.findById(id);
    
    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    
    return NextResponse.json(guest, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest:", error);
    return NextResponse.json({ error: "Failed to fetch guest" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Connect to the database
    await connectDB();
    
    // Update guest by ID
    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );
    
    if (!updatedGuest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedGuest, { status: 200 });
  } catch (error) {
    console.error("Error updating guest:", error);
    return NextResponse.json({ error: "Failed to update guest" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    // Connect to the database
    await connectDB();
    
    // Delete guest by ID
    const deletedGuest = await Guest.findByIdAndDelete(id);
    
    if (!deletedGuest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Guest deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json({ error: "Failed to delete guest" }, { status: 500 });
  }
} 