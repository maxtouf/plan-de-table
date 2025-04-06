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

export default IGuest; 