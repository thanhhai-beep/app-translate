import React, { useState } from 'react';
import { MangaInfo } from '@/types/manga';
import { useSources } from '@/hooks/useSources';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';

const ImportMangaPage = () => {
  const [mangaList, setMangaList] = useState<MangaInfo[]>([]);
  const { importMangaList, loading, saveMangaList } = useSources();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    const sourceType = formData.get('sourceType') as string;

    if (!url || !sourceType) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const result = await importMangaList(url, sourceType);
      // Add type and sourceUrl to each manga
      const processedResult = result.map(manga => ({
        ...manga,
        type: 'import' as const,
        sourceUrl: url
      }));
      setMangaList(processedResult);
    } catch (error) {
      console.error('Failed to import manga:', error);
    }
  };

  const handleImportAll = async () => {
    if (mangaList.length === 0) {
      alert('No manga to import');
      return;
    }

    try {
      await saveMangaList(mangaList);
      alert('All manga imported successfully');
      setMangaList([]);
    } catch (error) {
      console.error('Failed to save manga:', error);
      alert('Failed to save manga');
    }
  };

  return (
    <MainLayout>
      <PageTitle title="Manga | Library" description="Browse and manage manga collection" />
      <div className="bg-white rounded-lg shadow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Import Manga</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block mb-2">Manga URL</label>
              <input
                type="text"
                id="url"
                name="url"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="sourceType" className="block mb-2">Source Type</label>
              <select
                id="sourceType"
                name="sourceType"
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select a source</option>
                <option value="MANMANAPP">Manmanapp</option>
                <option value="TRUYENCHUHAY">Truyenchuhay</option>
                <option value="MANGADEX">MangaDex</option>
                <option value="MANGABAT">MangaBat</option>
                <option value="MANGAFOX">MangaFox</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Importing...' : 'Import Manga'}
            </button>
          </form>

          {mangaList.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Imported Manga List</h2>
                <button
                  onClick={handleImportAll}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Import All
                </button>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Title</th>
                    <th className="p-2 border">URL</th>
                    <th className="p-2 border">Source</th>
                    <th className="p-2 border">Source URL</th>
                  </tr>
                </thead>
                <tbody>
                  {mangaList.map((manga, index) => (
                    <tr key={index} className="border">
                      <td className="p-2">{manga.title}</td>
                      <td className="p-2">{manga.url}</td>
                      <td className="p-2">{manga.sourceType}</td>
                      <td className="p-2">{manga.sourceUrl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ImportMangaPage; 