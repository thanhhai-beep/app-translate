import { useRouter } from 'next/router';
import { useCreateChapter } from '@/hooks/useChapter';
import MainLayout from '@/layouts/MainLayout';
import { useState, useRef } from 'react';

export default function CreateChapter() {
  const router = useRouter();
  const { id: mangaId } = router.query;
  const createChapter = useCreateChapter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
    content: '',
    status: 'draft',
    contentType: 'text', // 'text' or 'image'
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('chapterNumber', formData.chapterNumber);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('contentType', formData.contentType);

      if (formData.contentType === 'text') {
        formDataToSend.append('content', formData.content);
      } else if (formData.contentType === 'image' && fileInputRef.current?.files?.[0]) {
        formDataToSend.append('content', fileInputRef.current.files[0]);
      }

      await createChapter.mutateAsync({
        mangaId: mangaId as string,
        data: formDataToSend,
      });
      router.push(`/manga/${mangaId}/chapters`);
    } catch (error) {
      console.error('Failed to create chapter:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create Chapter</h1>
        
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
            <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">
              Content Type
            </label>
            <select
              id="contentType"
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
          </div>

          {formData.contentType === 'text' ? (
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
          ) : (
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Image Content
              </label>
              <input
                type="file"
                id="content"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                required
                className="mt-1 block w-full"
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg shadow"
                  />
                </div>
              )}
            </div>
          )}

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
              disabled={createChapter.isPending}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {createChapter.isPending ? 'Creating...' : 'Create Chapter'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
} 