import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUpdateChapter } from '@/hooks/useChapter';
import { ChapterType, Chapter, ChapterStatus } from '@/types/chapter';
import MainLayout from '@/layouts/MainLayout';
import { apiClient } from '@/lib/api-client';

export default function EditChapter() {
  const router = useRouter();
  const { id: mangaId, chapterId } = router.query;
  const updateChapter = useUpdateChapter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
    content: '',
    contentType: ChapterType.TEXT,
    status: ChapterStatus.DRAFT,
    images: [] as string[],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      if (!mangaId || !chapterId) return;
      try {
        const response = await apiClient.get<Chapter>(`/manga/${mangaId}/chapters/${chapterId}`);
        const chapter = response.data;
        
        setFormData({
          chapterNumber: chapter.chapterNumber,
          title: chapter.title,
          content: chapter.content,
          contentType: chapter.contentType as ChapterType,
          status: chapter.status,
          images: chapter.images || [],
        });
        setPreviewImages(chapter.images || []);
      } catch (error) {
        console.error('Failed to fetch chapter:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChapter();
  }, [mangaId, chapterId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      const uploadedImages: string[] = [];
      const newPreviewImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post<{ path: string }>('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        uploadedImages.push(`${process.env.NEXT_PUBLIC_API_URL}${response.data.path}`);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviewImages.push(reader.result as string);
          if (newPreviewImages.length === files.length) {
            setPreviewImages(prev => [...prev, ...newPreviewImages]);
          }
        };
        reader.readAsDataURL(file);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mangaId || !chapterId) return;

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => formDataToSend.append(key, item));
        } else if (key === 'chapterNumber') {
          formDataToSend.append(key, Number(value).toString());
        } else {
          formDataToSend.append(key, value);
        }
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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      contentType: value as ChapterType,
      content: '',
      images: [],
    }));
    setPreviewImages([]);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa chapter</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="chapterNumber" className="block text-sm font-medium text-gray-700">
              Số chapter
            </label>
            <input
              type="text"
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
              Tiêu đề
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
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Loại chapter
            </label>
            <select
              id="type"
              name="type"
              value={formData.contentType}
              onChange={handleTypeChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={ChapterType.TEXT}>Truyện chữ</option>
              <option value={ChapterType.IMAGE}>Truyện tranh</option>
            </select>
          </div>

          {formData.contentType === ChapterType.TEXT ? (
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Nội dung
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
                Ảnh
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isUploading ? 'Đang tải lên...' : 'Chọn ảnh'}
                </button>
                <div className="mt-4 grid grid-cols-10 gap-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-28 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImages(prev => prev.filter((_, i) => i !== index));
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                          }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={ChapterStatus.DRAFT}>Bản nháp</option>
              <option value={ChapterStatus.PUBLISHED}>Đã xuất bản</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push(`/manga/${mangaId}/chapters`)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={updateChapter.isPending || isUploading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {updateChapter.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
} 