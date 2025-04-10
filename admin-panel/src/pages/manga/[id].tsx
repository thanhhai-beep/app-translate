import { useRouter } from 'next/router';
import { useManga, useUpdateManga, useDeleteManga } from '@/hooks/useManga';
import MainLayout from '@/layouts/MainLayout';
import { useState, useEffect } from 'react';

export default function EditManga() {
  const router = useRouter();
  const { id } = router.query;
  const updateManga = useUpdateManga();
  const deleteManga = useDeleteManga();
  const { data: manga, isLoading } = useManga(id as string);
  
  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    author: '',
    status: 'ongoing',
    description: '',
  });

  useEffect(() => {
    if (manga) {
      setFormData({
        title: manga.title,
        originalTitle: manga.originalTitle,
        author: manga.author,
        status: manga.status,
        description: manga.description || '',
      });
    }
  }, [manga]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      await updateManga.mutateAsync({ id: id as string, data: formData });
      router.push('/manga');
    } catch (error) {
      console.error('Failed to update manga:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this manga?')) {
      deleteManga.mutate(id as string);
      router.push('/manga');
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Edit Manga</h2>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => router.push(`/manga/${id}/chapters`)}
            >
              Manage Chapters
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete Manga
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="originalTitle" className="block text-sm font-medium text-gray-700">
              Original Title
            </label>
            <input
              type="text"
              id="originalTitle"
              name="originalTitle"
              value={formData.originalTitle}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="hiatus">Hiatus</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/manga')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateManga.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {updateManga.isPending ? 'Updating...' : 'Update Manga'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
} 