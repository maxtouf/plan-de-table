import mongoose, { Schema, models } from 'mongoose';

export interface ITable {
  _id?: string;
  name: string;
  number: number;
  capacity: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TableSchema = new Schema<ITable>(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    capacity: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Prevent multiple model initialization
const Table = models.Table || mongoose.model<ITable>('Table', TableSchema);

export default Table; 