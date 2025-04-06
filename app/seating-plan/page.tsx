'use client';

import { useState, useEffect } from 'react';
import { IGuest } from '@/models/Guest';
import { ITable } from '@/models/Table';
import { FaChair, FaUserFriends } from 'react-icons/fa';

export default function SeatingPlanPage() {
  const [tables, setTables] = useState<ITable[]>([]);
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [unassignedGuests, setUnassignedGuests] = useState<IGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch tables
        const tablesResponse = await fetch('/api/tables');
        if (!tablesResponse.ok) {
          throw new Error('Failed to fetch tables');
        }
        const tablesData = await tablesResponse.json();
        setTables(tablesData);

        // Fetch guests
        const guestsResponse = await fetch('/api/guests');
        if (!guestsResponse.ok) {
          throw new Error('Failed to fetch guests');
        }
        const guestsData = await guestsResponse.json();
        setGuests(guestsData);
        
        // Filter unassigned guests
        setUnassignedGuests(guestsData.filter((guest: IGuest) => !guest.tableNumber));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignGuest = async () => {
    if (!selectedGuest || !selectedTable) return;

    const selectedTableObj = tables.find(table => table._id === selectedTable);
    if (!selectedTableObj) return;

    try {
      const guestToUpdate = guests.find(guest => guest._id === selectedGuest);
      if (!guestToUpdate) return;

      const response = await fetch(`/api/guests/${selectedGuest}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...guestToUpdate,
          tableNumber: selectedTableObj.number,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update guest');
      }

      const updatedGuest = await response.json();

      // Update guests list
      setGuests(guests.map(guest => 
        guest._id === updatedGuest._id ? updatedGuest : guest
      ));

      // Update unassigned guests list
      setUnassignedGuests(unassignedGuests.filter(guest => guest._id !== updatedGuest._id));

      // Reset selection
      setSelectedGuest(null);
      setSelectedTable(null);
    } catch (err) {
      console.error('Error assigning guest:', err);
      alert('Erreur lors de l\'attribution de l\'invité à la table');
    }
  };

  const getGuestsForTable = (tableNumber: number) => {
    return guests.filter(guest => guest.tableNumber === tableNumber);
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Plan de table</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Tables et invités assignés</h2>
            
            {tables.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucune table n'a été créée. Veuillez d'abord créer des tables.
              </div>
            ) : (
              <div className="space-y-6">
                {tables.map(table => {
                  const tableGuests = getGuestsForTable(table.number);
                  return (
                    <div key={table._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">
                          Table {table.number}: {table.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaChair className="mr-1" />
                          {tableGuests.length}/{table.capacity}
                        </div>
                      </div>
                      
                      {tableGuests.length === 0 ? (
                        <div className="text-gray-500 italic text-sm">Aucun invité assigné</div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {tableGuests.map(guest => (
                            <div key={guest._id} className="bg-blue-50 p-2 rounded text-sm flex justify-between items-center">
                              <span>
                                {guest.name}
                                {guest.numberOfPeople > 1 && (
                                  <span className="text-xs text-gray-500 ml-1">
                                    (+{guest.numberOfPeople - 1})
                                  </span>
                                )}
                              </span>
                              {guest.isAttending === true && <span className="text-green-500 text-xs">Présent</span>}
                              {guest.isAttending === false && <span className="text-red-500 text-xs">Absent</span>}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <button
                          onClick={() => setSelectedTable(table._id || null)}
                          className={`text-sm py-1 px-2 rounded ${
                            selectedTable === table._id
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {selectedTable === table._id ? 'Table sélectionnée' : 'Sélectionner'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Invités non assignés</h2>
            
            {unassignedGuests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Tous les invités sont assignés à une table.
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {unassignedGuests.map(guest => (
                    <div
                      key={guest._id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedGuest === guest._id
                          ? 'bg-blue-50 border-blue-300'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedGuest(guest._id || null)}
                    >
                      <div className="font-medium">{guest.name}</div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <FaUserFriends className="mr-1" size={12} />
                        <span>{guest.numberOfPeople}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAssignGuest}
                  disabled={!selectedGuest || !selectedTable}
                  className={`w-full py-2 rounded-md font-medium ${
                    selectedGuest && selectedTable
                      ? 'bg-primary text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Assigner à la table
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 