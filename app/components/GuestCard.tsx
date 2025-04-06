'use client';

import { IGuest } from '@/models/Guest';
import { useState } from 'react';
import { FaCheck, FaTimes, FaQuestion, FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

interface GuestCardProps {
  guest: IGuest;
  onEdit: (guest: IGuest) => void;
  onDelete: (guest: IGuest) => void;
}

export default function GuestCard({ guest, onEdit, onDelete }: GuestCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (isDeleting) return;
    
    const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer ${guest.name} ?`);
    if (!confirmed) return;
    
    setIsDeleting(true);
    try {
      await onDelete(guest);
    } catch (error) {
      console.error('Error deleting guest:', error);
      alert('Erreur lors de la suppression de l\'invité');
    } finally {
      setIsDeleting(false);
    }
  };
  
  const getStatusIcon = () => {
    if (guest.isAttending === true) return <FaCheck className="text-green-500" />;
    if (guest.isAttending === false) return <FaTimes className="text-red-500" />;
    return <FaQuestion className="text-gray-400" />;
  };
  
  const getStatusText = () => {
    if (guest.isAttending === true) return 'Présent';
    if (guest.isAttending === false) return 'Absent';
    return 'Non confirmé';
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{guest.name}</h3>
          <div className="mt-1 text-sm text-gray-600 flex space-x-1 items-center">
            <span>{getStatusIcon()}</span>
            <span className="ml-1">{getStatusText()}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <FaUserPlus className="mr-1 text-gray-400" size={14} />
              {guest.numberOfPeople}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(guest)}
            className="p-2 text-primary hover:text-blue-700 transition-colors"
            title="Modifier"
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:text-red-700 transition-colors"
            title="Supprimer"
            disabled={isDeleting}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      {(guest.email || guest.phone) && (
        <div className="mt-3 text-sm">
          {guest.email && <div>Email: {guest.email}</div>}
          {guest.phone && <div>Tél: {guest.phone}</div>}
        </div>
      )}
      
      {guest.tableNumber && (
        <div className="mt-2 text-sm">
          <span className="font-medium">Table:</span> {guest.tableNumber}
        </div>
      )}
      
      {guest.dietaryRestrictions && (
        <div className="mt-2 text-sm">
          <span className="font-medium">Restrictions alimentaires:</span> {guest.dietaryRestrictions}
        </div>
      )}
      
      {guest.notes && (
        <div className="mt-2 text-sm">
          <span className="font-medium">Notes:</span> {guest.notes}
        </div>
      )}
    </div>
  );
} 