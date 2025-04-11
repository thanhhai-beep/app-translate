import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Manga', value: '0', icon: '📚' },
    { label: 'Total Chapters', value: '0', icon: '📑' },
    { label: 'Total Translations', value: '0', icon: '🌐' },
    { label: 'Active Users', value: '0', icon: '👥' },
  ];

  const recentActivities = [
    { type: 'translation', message: 'New translation added', time: '2 hours ago' },
    { type: 'chapter', message: 'New chapter uploaded', time: '3 hours ago' },
    { type: 'user', message: 'New user registered', time: '5 hours ago' },
  ];

  return (
    <MainLayout>
      <PageTitle title="Dashboard | Overview" description="View system statistics and recent activities" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.username}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-3">
                      {activity.type === 'translation' && '🌐'}
                      {activity.type === 'chapter' && '📑'}
                      {activity.type === 'user' && '👤'}
                    </span>
                    <span className="text-gray-700">{activity.message}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage; 