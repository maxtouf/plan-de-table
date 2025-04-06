import mongoose, { Schema, models } from 'mongoose';

export interface IGuest {
  _id?: string;
  name: string;
  email?: string;
  phone?: string;
  isAttending: boolean | null;
  numberOfPeople: number;
  tableNumber?: number;
  dietaryRestrictions?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema = new Schema<IGuest>(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    isAttending: { type: Boolean, default: null },
    numberOfPeople: { type: Number, default: 1 },
    tableNumber: { type: Number },
    dietaryRestrictions: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

// Prevent multiple model initialization
const Guest = models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);

export default Guest; 