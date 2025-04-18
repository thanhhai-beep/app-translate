import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import { useAudio } from '@/hooks/useAudio';

interface AudioFile {
  id: string;
  title: string;
  mangaId: string;
  startChapterNumber: number;
  endChapterNumber: number;
  filePath?: string;
  duration?: number;
  fileSize?: number;
  format: string;
  bitrate?: number;
  sampleRate?: number;
  channels: number;
  status: 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export default function AudioListPage() {
  const router = useRouter();
  const { audioFiles, isLoadingList: loading, error } = useAudio();
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <PageTitle title="Audio | Management" description="Manage audio files generated from manga chapters" />
      <div className='bg-white rounded-lg shadow'>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Audio Files</h1>
            <button
              onClick={() => router.push('/audio/create')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create New Audio
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chapters
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {audioFiles?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No audio files found. Create your first audio file.
                      </td>
                    </tr>
                  ) : (
                    audioFiles?.map((audio: any) => (
                      <tr key={audio.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{audio.title}</div>
                          <div className="text-sm text-gray-500">{audio.format.toUpperCase()} • {audio.bitrate}kbps</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* <div className="text-sm text-gray-900">
                            {audio.startChapterNumber} - {audio.endChapterNumber}
                          </div> */}
                          <div className="w-64">
                            <audio controls className="w-full">
                              <source src={process.env.NEXT_PUBLIC_API_URL + "/" + audio.filePath} type="audio/mpeg" />
                              Trình duyệt của bạn không hỗ trợ phát audio.
                            </audio>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {audio.duration ? formatDuration(audio.duration) : '-'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {audio.fileSize ? formatFileSize(audio.fileSize) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(audio.status)}`}>
                            {audio.status.charAt(0).toUpperCase() + audio.status.slice(1)}
                          </span>
                          {audio.errorMessage && (
                            <div className="text-xs text-red-600 mt-1 max-w-xs truncate" title={audio.errorMessage}>
                              {audio.errorMessage}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(audio.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {/* <button
                            onClick={() => router.push(`/audio/${audio.id}`)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View
                          </button> */}
                          {audio.status === 'completed' && (
                            <button
                              onClick={() => window.open(`/api/audio/${audio.id}/download`, '_blank')}
                              className="text-green-600 hover:text-green-900 mr-4"
                            >
                              Download
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this audio file?')) {
                                // TODO: Implement delete functionality
                                console.log('Delete audio:', audio.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 