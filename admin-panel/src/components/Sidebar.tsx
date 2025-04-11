import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Manga', href: '/manga', icon: '📚' },
    { name: 'Categories', href: '/categories', icon: '🏷️' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="h-full w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-5">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2 text-sm font-medium ${
              router.pathname === item.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 