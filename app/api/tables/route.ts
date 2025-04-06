import { NextRequest, NextResponse } from 'next/server';
import Table from '@/models/Table';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();
    
    // Get all tables
    const tables = await Table.find({}).sort({ number: 1 });
    
    return NextResponse.json(tables, { status: 200 });
  } catch (error) {
    console.error("Error fetching tables:", error);
    return NextResponse.json({ error: "Failed to fetch tables" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Connect to the database
    await connectDB();
    
    // Create a new table
    const newTable = new Table(body);
    await newTable.save();
    
    return NextResponse.json(newTable, { status: 201 });
  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json({ error: "Failed to create table" }, { status: 500 });
  }
} 