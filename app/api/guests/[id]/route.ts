import { NextRequest, NextResponse } from 'next/server';
import { guestAPI } from '@/lib/localStore';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const guest = await guestAPI.getById(id);
    
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
    
    const updatedGuest = await guestAPI.update(id, body);
    
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
    
    const success = await guestAPI.delete(id);
    
    if (!success) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Guest deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json({ error: "Failed to delete guest" }, { status: 500 });
  }
} 