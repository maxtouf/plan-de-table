import { NextRequest, NextResponse } from 'next/server';
import Table from '@/models/Table';
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
    
    // Find table by ID
    const table = await Table.findById(id);
    
    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }
    
    return NextResponse.json(table, { status: 200 });
  } catch (error) {
    console.error("Error fetching table:", error);
    return NextResponse.json({ error: "Failed to fetch table" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Connect to the database
    await connectDB();
    
    // Update table by ID
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );
    
    if (!updatedTable) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedTable, { status: 200 });
  } catch (error) {
    console.error("Error updating table:", error);
    return NextResponse.json({ error: "Failed to update table" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    // Connect to the database
    await connectDB();
    
    // Delete table by ID
    const deletedTable = await Table.findByIdAndDelete(id);
    
    if (!deletedTable) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Table deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting table:", error);
    return NextResponse.json({ error: "Failed to delete table" }, { status: 500 });
  }
} 