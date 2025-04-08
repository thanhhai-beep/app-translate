import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';

interface Settings {
  siteName: string;
  siteDescription: string;
  defaultLanguage: string;
  maxUploadSize: number;
  allowedFileTypes: string[];
  enableRegistration: boolean;
  enableComments: boolean;
  maintenanceMode: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Manga Translation Platform',
    siteDescription: 'A platform for manga translation and management',
    defaultLanguage: 'en',
    maxUploadSize: 10,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'webp'],
    enableRegistration: true,
    enableComments: true,
    maintenanceMode: false,
  });

  const handleChange = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save settings to backend
    console.log('Saving settings:', settings);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Site Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Site Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Site Description</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleChange('siteDescription', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Language</label>
                  <select
                    value={settings.defaultLanguage}
                    onChange={(e) => handleChange('defaultLanguage', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>

              {/* Upload Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Upload Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Upload Size (MB)</label>
                  <input
                    type="number"
                    value={settings.maxUploadSize}
                    onChange={(e) => handleChange('maxUploadSize', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Allowed File Types</label>
                  <input
                    type="text"
                    value={settings.allowedFileTypes.join(', ')}
                    onChange={(e) => handleChange('allowedFileTypes', e.target.value.split(',').map(t => t.trim()))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Feature Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Feature Settings</h3>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.enableRegistration}
                    onChange={(e) => handleChange('enableRegistration', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Enable User Registration</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.enableComments}
                    onChange={(e) => handleChange('enableComments', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Enable Comments</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Maintenance Mode</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage; 