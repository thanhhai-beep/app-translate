import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import { useAudio } from '@/hooks/useAudio';

interface AudioFile {
  id: string;
  title: string;
  mangaId: string;
  mangaTitle: string;
  startChapterId: string;
  startChapterNumber: number;
  endChapterId: string;
  endChapterNumber: number;
  filePath: string;
  duration: number;
  fileSize: number;
  format: string;
  bitrate: number;
  sampleRate: number;
  channels: number;
  status: 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AudioDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { audioFile, isLoadingDetail: isLoading, error } = useAudio();
  const [audio, setAudio] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string' && audioFile) {
      setAudio(audioFile);
    }
  }, [id, audioFile]);

  const handleRefresh = async () => {
    if (id && typeof id === 'string') {
      setIsRefreshing(true);
      try {
        // Refresh the page to get updated data
        router.reload();
      } catch (err) {
        console.error('Failed to refresh audio:', err);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

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

  const handleDownload = () => {
    if (audio && audio.status === 'completed') {
      window.open(`/api/audio/${audio.id}/download`, '_blank');
    }
  };

  const handleDelete = async () => {
    if (audio && confirm('Are you sure you want to delete this audio file?')) {
      try {
        // TODO: Implement delete functionality
        console.log('Delete audio:', audio.id);
        router.push('/audio');
      } catch (err) {
        console.error('Failed to delete audio:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <PageTitle title="Audio | Details" description="View audio file details" />
        <div className="p-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <PageTitle title="Audio | Details" description="View audio file details" />
        <div className="p-6">
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            {error}
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.push('/audio')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Audio List
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!audio) {
    return (
      <MainLayout>
        <PageTitle title="Audio | Details" description="View audio file details" />
        <div className="p-6">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md">
            Audio not found
          </div>
          <div className="mt-4">
            <button
              onClick={() => router.push('/audio')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Audio List
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTitle title={`${audio.title} | Audio Details`} description="View audio file details" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{audio.title}</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isRefreshing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </span>
              ) : (
                'Refresh'
              )}
            </button>
            {audio.status === 'completed' && (
              <button
                onClick={handleDownload}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Download
              </button>
            )}
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(audio.status)}`}>
                {audio.status.charAt(0).toUpperCase() + audio.status.slice(1)}
              </span>
              {audio.errorMessage && (
                <span className="ml-2 text-sm text-red-600">{audio.errorMessage}</span>
              )}
            </div>
          </div>
          
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Manga Information</h3>
                <dl className="grid grid-cols-1 gap-2">
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">Manga:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">{audio.mangaTitle}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">Chapters:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">
                      {audio.startChapterNumber} - {audio.endChapterNumber}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Audio Information</h3>
                <dl className="grid grid-cols-1 gap-2">
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">Format:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">{audio.format.toUpperCase()}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">Bitrate:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">{audio.bitrate} kbps</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">Sample Rate:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">{audio.sampleRate} Hz</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">Channels:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">{audio.channels === 1 ? 'Mono' : 'Stereo'}</dd>
                  </div>
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">Duration:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">
                      {audio.duration ? formatDuration(audio.duration) : '-'}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="text-sm font-medium text-gray-500 w-1/3">File Size:</dt>
                    <dd className="text-sm text-gray-900 w-2/3">
                      {audio.fileSize ? formatFileSize(audio.fileSize) : '-'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-500">
              <div>
                <span>Created: {new Date(audio.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span>Last Updated: {new Date(audio.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => router.push('/audio')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Audio List
          </button>
        </div>
      </div>
    </MainLayout>
  );
} 