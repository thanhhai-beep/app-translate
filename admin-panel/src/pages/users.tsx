import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  status: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <MainLayout>
      <PageTitle title="Users | Management" description="Manage user accounts, roles, and permissions" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Users Management</h1>
        {/* Users table */}
      </div>
    </MainLayout>
  );
} 