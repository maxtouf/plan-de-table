export interface ITable {
  _id?: string;
  name: string;
  number: number;
  capacity: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default ITable; 