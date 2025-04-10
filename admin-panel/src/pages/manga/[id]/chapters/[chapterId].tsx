import { useRouter } from 'next/router';
import { useChapter, useUpdateChapter } from '@/hooks/useChapter';
import MainLayout from '@/layouts/MainLayout';
import { useEffect, useState } from 'react';

export default function EditChapter() {
  const router = useRouter();
  const { id: mangaId, chapterId } = router.query;
  const updateChapter = useUpdateChapter();
  const { data: chapter, isLoading } = useChapter(mangaId as string, chapterId as string);
  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
    content: '',
    status: 'draft',
  });

  useEffect(() => {
    if (chapter) {
      setFormData({
        chapterNumber: chapter.chapterNumber.toString(),
        title: chapter.title,
        content: chapter.content,
        status: chapter.status,
      });
    }
  }, [chapter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('chapterNumber', formData.chapterNumber);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('status', formData.status);

      await updateChapter.mutateAsync({
        mangaId: mangaId as string,
        chapterId: chapterId as string,
        data: formDataToSend,
      });
      router.push(`/manga/${mangaId}/chapters`);
    } catch (error) {
      console.error('Failed to update chapter:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="p-6">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Chapter</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div>
            <label htmlFor="chapterNumber" className="block text-sm font-medium text-gray-700">
              Chapter Number
            </label>
            <input
              type="number"
              id="chapterNumber"
              name="chapterNumber"
              value={formData.chapterNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

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
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
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
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateChapter.isPending}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {updateChapter.isPending ? 'Updating...' : 'Update Chapter'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
} 