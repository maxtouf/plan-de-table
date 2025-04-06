'use client';

import { useState, FormEvent } from 'react';
import { ITable } from '@/models/Table';

interface TableFormProps {
  table?: ITable;
  onSubmit: (tableData: Partial<ITable>) => Promise<void>;
}

export default function TableForm({ table, onSubmit }: TableFormProps) {
  const [formData, setFormData] = useState<Partial<ITable>>(
    table || {
      name: '',
      number: 1,
      capacity: 8,
      notes: ''
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      [name]: parseInt(value) || 0
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
          Nom de la table *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="input"
          placeholder="Ex: Table famille"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de table *
          </label>
          <input
            type="number"
            id="number"
            name="number"
            required
            min="1"
            value={formData.number}
            onChange={handleNumberChange}
            className="input"
          />
        </div>
        
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
            Capacité *
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            required
            min="1"
            value={formData.capacity}
            onChange={handleNumberChange}
            className="input"
          />
        </div>
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
          {isSubmitting ? 'Enregistrement...' : table ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
} 