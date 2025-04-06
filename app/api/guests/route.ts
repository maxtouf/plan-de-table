import { NextRequest, NextResponse } from 'next/server';
import { guestAPI } from '@/lib/localStore';

export async function GET(request: NextRequest) {
  try {
    const guests = await guestAPI.getAll();
    return NextResponse.json(guests, { status: 200 });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newGuest = await guestAPI.create(body);
    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    console.error("Error creating guest:", error);
    return NextResponse.json({ error: "Failed to create guest" }, { status: 500 });
  }
} 