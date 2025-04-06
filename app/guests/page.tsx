'use client';

import { useState, useEffect } from 'react';
import { IGuest } from '@/models/Guest';
import GuestCard from '@/app/components/GuestCard';
import GuestForm from '@/app/components/GuestForm';
import { FaPlus, FaTimes } from 'react-icons/fa';

export default function GuestsPage() {
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editGuest, setEditGuest] = useState<IGuest | null>(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      
      const data = await response.json();
      setGuests(data);
    } catch (err) {
      console.error('Error fetching guests:', err);
      setError('Impossible de charger les invités. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async (guestData: Partial<IGuest>) => {
    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add guest');
      }
      
      const newGuest = await response.json();
      setGuests([...guests, newGuest]);
      setShowForm(false);
    } catch (err) {
      console.error('Error adding guest:', err);
      throw err;
    }
  };

  const handleUpdateGuest = async (guestData: Partial<IGuest>) => {
    if (!editGuest?._id) return;
    
    try {
      const response = await fetch(`/api/guests/${editGuest._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update guest');
      }
      
      const updatedGuest = await response.json();
      
      setGuests(
        guests.map((guest) => (guest._id === updatedGuest._id ? updatedGuest : guest))
      );
      
      setEditGuest(null);
    } catch (err) {
      console.error('Error updating guest:', err);
      throw err;
    }
  };

  const handleDeleteGuest = async (guest: IGuest) => {
    if (!guest._id) return;
    
    try {
      const response = await fetch(`/api/guests/${guest._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete guest');
      }
      
      setGuests(guests.filter((g) => g._id !== guest._id));
    } catch (err) {
      console.error('Error deleting guest:', err);
      throw err;
    }
  };

  const handleEdit = (guest: IGuest) => {
    setEditGuest(guest);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditGuest(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des invités</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center"
          >
            <FaPlus className="mr-2" /> Ajouter un invité
          </button>
        )}
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>}

      {showForm && (
        <div className="card relative">
          <button
            onClick={handleCancelForm}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4">
            {editGuest ? 'Modifier un invité' : 'Ajouter un invité'}
          </h2>
          <GuestForm
            guest={editGuest || undefined}
            onSubmit={editGuest ? handleUpdateGuest : handleAddGuest}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : guests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun invité pour le moment. Commencez par en ajouter un !
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guests.map((guest) => (
            <GuestCard
              key={guest._id}
              guest={guest}
              onEdit={handleEdit}
              onDelete={handleDeleteGuest}
            />
          ))}
        </div>
      )}
    </div>
  );
} 