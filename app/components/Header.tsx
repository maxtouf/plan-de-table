import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-2xl font-bold">
              Plan de Table
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-gray-200 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/guests" className="hover:text-gray-200 transition-colors">
                  Invités
                </Link>
              </li>
              <li>
                <Link href="/tables" className="hover:text-gray-200 transition-colors">
                  Tables
                </Link>
              </li>
              <li>
                <Link href="/seating-plan" className="hover:text-gray-200 transition-colors">
                  Plan de table
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 