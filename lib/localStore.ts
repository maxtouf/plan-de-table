// Utilitaire de stockage local pour remplacer MongoDB

import { IGuest } from '@/models/Guest';
import { ITable } from '@/models/Table';

// Types pour le stockage
interface LocalStore {
  guests: IGuest[];
  tables: ITable[];
}

// Fonction pour créer un ID unique
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Initialiser le stockage local
export function initializeStore(): void {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem('planDeTable')) {
    const initialStore: LocalStore = {
      guests: [],
      tables: []
    };
    localStorage.setItem('planDeTable', JSON.stringify(initialStore));
  }
}

// Récupérer la totalité du stockage
export function getStore(): LocalStore {
  if (typeof window === 'undefined') {
    return { guests: [], tables: [] };
  }
  
  initializeStore();
  const storeData = localStorage.getItem('planDeTable');
  return storeData ? JSON.parse(storeData) : { guests: [], tables: [] };
}

// Mettre à jour le stockage
export function updateStore(newStore: LocalStore): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('planDeTable', JSON.stringify(newStore));
}

// API pour les invités
export const guestAPI = {
  getAll: (): Promise<IGuest[]> => {
    return new Promise((resolve) => {
      const store = getStore();
      resolve(store.guests);
    });
  },
  
  getById: (id: string): Promise<IGuest | null> => {
    return new Promise((resolve) => {
      const store = getStore();
      const guest = store.guests.find(g => g._id === id);
      resolve(guest || null);
    });
  },
  
  create: (guest: Partial<IGuest>): Promise<IGuest> => {
    return new Promise((resolve) => {
      const store = getStore();
      const newGuest: IGuest = {
        ...guest,
        _id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      } as IGuest;
      
      store.guests.push(newGuest);
      updateStore(store);
      resolve(newGuest);
    });
  },
  
  update: (id: string, guest: Partial<IGuest>): Promise<IGuest | null> => {
    return new Promise((resolve) => {
      const store = getStore();
      const index = store.guests.findIndex(g => g._id === id);
      
      if (index === -1) {
        resolve(null);
        return;
      }
      
      const updatedGuest: IGuest = {
        ...store.guests[index],
        ...guest,
        updatedAt: new Date()
      };
      
      store.guests[index] = updatedGuest;
      updateStore(store);
      resolve(updatedGuest);
    });
  },
  
  delete: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const store = getStore();
      const index = store.guests.findIndex(g => g._id === id);
      
      if (index === -1) {
        resolve(false);
        return;
      }
      
      store.guests.splice(index, 1);
      updateStore(store);
      resolve(true);
    });
  }
};

// API pour les tables
export const tableAPI = {
  getAll: (): Promise<ITable[]> => {
    return new Promise((resolve) => {
      const store = getStore();
      resolve(store.tables);
    });
  },
  
  getById: (id: string): Promise<ITable | null> => {
    return new Promise((resolve) => {
      const store = getStore();
      const table = store.tables.find(t => t._id === id);
      resolve(table || null);
    });
  },
  
  create: (table: Partial<ITable>): Promise<ITable> => {
    return new Promise((resolve) => {
      const store = getStore();
      const newTable: ITable = {
        ...table,
        _id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      } as ITable;
      
      store.tables.push(newTable);
      updateStore(store);
      resolve(newTable);
    });
  },
  
  update: (id: string, table: Partial<ITable>): Promise<ITable | null> => {
    return new Promise((resolve) => {
      const store = getStore();
      const index = store.tables.findIndex(t => t._id === id);
      
      if (index === -1) {
        resolve(null);
        return;
      }
      
      const updatedTable: ITable = {
        ...store.tables[index],
        ...table,
        updatedAt: new Date()
      };
      
      store.tables[index] = updatedTable;
      updateStore(store);
      resolve(updatedTable);
    });
  },
  
  delete: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const store = getStore();
      const index = store.tables.findIndex(t => t._id === id);
      
      if (index === -1) {
        resolve(false);
        return;
      }
      
      store.tables.splice(index, 1);
      updateStore(store);
      resolve(true);
    });
  }
}; 