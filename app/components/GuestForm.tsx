'use client';

import { useState, FormEvent } from 'react';
import { IGuest } from '@/models/Guest';

interface GuestFormProps {
  guest?: IGuest;
  onSubmit: (guestData: Partial<IGuest>) => Promise<void>;
}

export default function GuestForm({ guest, onSubmit }: GuestFormProps) {
  const [formData, setFormData] = useState<Partial<IGuest>>(
    guest || {
      name: '',
      email: '',
      phone: '',
      isAttending: null,
      numberOfPeople: 1,
      dietaryRestrictions: '',
      notes: ''
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 1
    }));
  };
  
  const handleAttendanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    
    let isAttending: boolean | null = null;
    if (value === 'true') isAttending = true;
    if (value === 'false') isAttending = false;
    
    setFormData((prev) => ({
      ...prev,
      isAttending
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="input"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="isAttending" className="block text-sm font-medium text-gray-700 mb-1">
            Présence
          </label>
          <select
            id="isAttending"
            name="isAttending"
            value={
              formData.isAttending === true
                ? 'true'
                : formData.isAttending === false
                ? 'false'
                : 'null'
            }
            onChange={handleAttendanceChange}
            className="input"
          >
            <option value="null">Non confirmé</option>
            <option value="true">Présent</option>
            <option value="false">Absent</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de personnes
          </label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            min="1"
            value={formData.numberOfPeople}
            onChange={handleNumberChange}
            className="input"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-1">
          Restrictions alimentaires
        </label>
        <textarea
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions || ''}
          onChange={handleChange}
          className="input"
          rows={2}
        />
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          className="input"
          rows={3}
        />
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full md:w-auto"
        >
          {isSubmitting ? 'Enregistrement...' : guest ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
} 