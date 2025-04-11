import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Categories', path: '/categories', icon: '📚' },
    { label: 'Manga', path: '/manga', icon: '📚' },
    { label: 'Chapters', path: '/chapters', icon: '📑' },
    { label: 'Translations', path: '/translations', icon: '🌐' },
    { label: 'Users', path: '/users', icon: '👥' },
    { label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                router.pathname === item.path ? 'bg-gray-100 border-l-4 border-blue-500' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === router.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 