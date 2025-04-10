import { useRouter } from 'next/router';
import { useChapter, useUpdateChapter } from '@/hooks/useChapter';
import MainLayout from '@/layouts/MainLayout';
import { useEffect, useState, useRef } from 'react';

export default function EditChapter() {
  const router = useRouter();
  const { id: mangaId, chapterId } = router.query;
  const updateChapter = useUpdateChapter();
  const { data: chapter, isLoading } = useChapter(mangaId as string, chapterId as string);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
    content: '',
    status: 'draft',
    contentType: 'text', // 'text' or 'image'
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string>("");

  useEffect(() => {
    if (chapter) {
      setFormData({
        chapterNumber: chapter.chapterNumber.toString(),
        title: chapter.title,
        content: chapter.content,
        status: chapter.status,
        contentType: chapter.contentType,
      });
      
      // If chapter has images, set preview URLs
      if (chapter.content && chapter.contentType === 'image') {
        setPreviewUrls(chapter.content);
      }
    }
  }, [chapter]);

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
      }
      
      // Append each file to formData
      files.forEach((file) => {
        formDataToSend.append(`images`, file);
      });

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
    
    // Reset files when switching to text content type
    if (name === 'contentType' && value === 'text') {
      setFiles([]);
      setPreviewUrls("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
                Text Content
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
              <label className="block text-sm font-medium text-gray-700">
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
              {previewUrls && (
                <div className="mt-4">
                  <img
                    src={previewUrls}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg shadow"
                  />
                </div>
              )}

              {/* Preview uploaded images */}
              {/* {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )} */}
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