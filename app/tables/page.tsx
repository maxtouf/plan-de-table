'use client';

import { useState, useEffect } from 'react';
import { ITable } from '@/models/Table';
import TableForm from '@/app/components/TableForm';
import { FaPlus, FaTimes, FaEdit, FaTrash, FaChair } from 'react-icons/fa';

export default function TablesPage() {
  const [tables, setTables] = useState<ITable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editTable, setEditTable] = useState<ITable | null>(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tables');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tables');
      }
      
      const data = await response.json();
      setTables(data);
    } catch (err) {
      console.error('Error fetching tables:', err);
      setError('Impossible de charger les tables. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async (tableData: Partial<ITable>) => {
    try {
      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add table');
      }
      
      const newTable = await response.json();
      setTables([...tables, newTable]);
      setShowForm(false);
    } catch (err) {
      console.error('Error adding table:', err);
      throw err;
    }
  };

  const handleUpdateTable = async (tableData: Partial<ITable>) => {
    if (!editTable?._id) return;
    
    try {
      const response = await fetch(`/api/tables/${editTable._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update table');
      }
      
      const updatedTable = await response.json();
      
      setTables(
        tables.map((table) => (table._id === updatedTable._id ? updatedTable : table))
      );
      
      setEditTable(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error updating table:', err);
      throw err;
    }
  };

  const handleDeleteTable = async (tableId: string) => {
    try {
      const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette table ?');
      if (!confirmed) return;
      
      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete table');
      }
      
      setTables(tables.filter((table) => table._id !== tableId));
    } catch (err) {
      console.error('Error deleting table:', err);
      alert('Erreur lors de la suppression de la table');
    }
  };

  const handleEdit = (table: ITable) => {
    setEditTable(table);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditTable(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des tables</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center"
          >
            <FaPlus className="mr-2" /> Ajouter une table
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
            {editTable ? 'Modifier une table' : 'Ajouter une table'}
          </h2>
          <TableForm
            table={editTable || undefined}
            onSubmit={editTable ? handleUpdateTable : handleAddTable}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : tables.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucune table pour le moment. Commencez par en ajouter une !
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Numéro</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Nom</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Capacité</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Notes</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{table.number}</td>
                  <td className="py-3 px-4">{table.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <FaChair className="text-secondary mr-2" size={14} />
                      <span>{table.capacity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{table.notes}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(table)}
                        className="p-1.5 text-primary hover:text-blue-700 transition-colors"
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => table._id && handleDeleteTable(table._id)}
                        className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 