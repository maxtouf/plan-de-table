import { NextRequest, NextResponse } from 'next/server';
import { tableAPI } from '@/lib/localStore';

export async function GET(request: NextRequest) {
  try {
    const tables = await tableAPI.getAll();
    return NextResponse.json(tables, { status: 200 });
  } catch (error) {
    console.error("Error fetching tables:", error);
    return NextResponse.json({ error: "Failed to fetch tables" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newTable = await tableAPI.create(body);
    return NextResponse.json(newTable, { status: 201 });
  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json({ error: "Failed to create table" }, { status: 500 });
  }
} 