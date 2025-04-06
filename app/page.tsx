import Link from 'next/link';
import { FaUserFriends, FaChair, FaClipboardList } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2">Plan de Table</h1>
        <p className="text-lg text-gray-600">
          Gérez facilement votre plan de table et les confirmations de présence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          href="/guests" 
          className="card text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center py-10"
        >
          <FaUserFriends className="text-5xl text-primary mb-4" />
          <h2 className="text-xl font-semibold">Gestion des invités</h2>
          <p className="mt-2 text-gray-600">
            Ajoutez et gérez vos invités, suivez les confirmations de présence
          </p>
        </Link>

        <Link 
          href="/tables" 
          className="card text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center py-10"
        >
          <FaChair className="text-5xl text-secondary mb-4" />
          <h2 className="text-xl font-semibold">Gestion des tables</h2>
          <p className="mt-2 text-gray-600">
            Créez et organisez les tables pour votre événement
          </p>
        </Link>

        <Link 
          href="/seating-plan" 
          className="card text-center hover:shadow-lg transition-shadow flex flex-col items-center justify-center py-10"
        >
          <FaClipboardList className="text-5xl text-accent mb-4" />
          <h2 className="text-xl font-semibold">Plan de table</h2>
          <p className="mt-2 text-gray-600">
            Assignez les invités aux tables et visualisez le plan
          </p>
        </Link>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-medium text-gray-800">Invités</div>
            <div className="text-3xl font-bold text-primary mt-1">-</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-medium text-gray-800">Confirmations</div>
            <div className="text-3xl font-bold text-green-600 mt-1">-</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-lg font-medium text-gray-800">Tables</div>
            <div className="text-3xl font-bold text-accent mt-1">-</div>
          </div>
        </div>
      </div>
    </div>
  );
} 