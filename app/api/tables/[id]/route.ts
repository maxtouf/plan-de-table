import { NextRequest, NextResponse } from 'next/server';
import { tableAPI } from '@/lib/localStore';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const table = await tableAPI.getById(id);
    
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
    
    const updatedTable = await tableAPI.update(id, body);
    
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
    
    const success = await tableAPI.delete(id);
    
    if (!success) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Table deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting table:", error);
    return NextResponse.json({ error: "Failed to delete table" }, { status: 500 });
  }
} 