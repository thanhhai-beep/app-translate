import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAudio } from '@/hooks/useAudio';
import { useMangas } from '@/hooks/useManga';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';

export default function CreateAudioPage() {
  const router = useRouter();
  const { createAudio, error } = useAudio();
  const { data: dataManga } = useMangas(1, 50);
  const [mangaList, setMangaList] = useState([]);
  const [selectedManga, setSelectedManga] = useState('');
  const [startChapterNumber, setStartChapterNumber] = useState(1);
  const [endChapterNumber, setEndChapterNumber] = useState(1);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioSettings, setAudioSettings] = useState({
    bitrate: 128,
    sampleRate: 44100,
    channels: 2,
  });

  useEffect(() => {
    if (dataManga) {
      setMangaList(dataManga?.mangas as any);
    }
  }, [dataManga]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const audio = await createAudio({
        title,
        mangaId: selectedManga,
        startChapterNumber,
        endChapterNumber,
        ...audioSettings,
      });
      router.push(`/audio/${audio.id}`);
    } catch (err) {
      console.error('Failed to create audio:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <PageTitle title="Create Audio | New" description="Create a new audio file from manga chapters" />
      
      <div className='bg-white rounded-lg shadow p-6'>
        <div className="max-w-4xl mx-auto py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Manga</label>
              <select
                value={selectedManga}
                onChange={(e) => setSelectedManga(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a manga</option>
                {mangaList.map((manga: any) => (
                  <option key={manga.id} value={manga.id}>
                    {manga.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Chapter</label>
                <input
                  type="number"
                  min="1"
                  value={startChapterNumber}
                  onChange={(e) => setStartChapterNumber(parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Chapter</label>
                <input
                  type="number"
                  min="1"
                  value={endChapterNumber}
                  onChange={(e) => setEndChapterNumber(parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Audio Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Bitrate (kbps)</label>
                <input
                  type="number"
                  min="32"
                  max="320"
                  value={audioSettings.bitrate}
                  onChange={(e) => setAudioSettings({ ...audioSettings, bitrate: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sample Rate (Hz)</label>
                <input
                  type="number"
                  min="8000"
                  max="48000"
                  value={audioSettings.sampleRate}
                  onChange={(e) => setAudioSettings({ ...audioSettings, sampleRate: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Channels</label>
                <select
                  value={audioSettings.channels}
                  onChange={(e) => setAudioSettings({ ...audioSettings, channels: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value={1}>Mono</option>
                  <option value={2}>Stereo</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Audio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
} 