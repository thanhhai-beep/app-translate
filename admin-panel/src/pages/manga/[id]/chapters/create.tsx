import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useCreateChapter } from '@/hooks/useChapters';
import { ContentType, ChapterStatus } from '@/types/chapter';
import MainLayout from '@/layouts/MainLayout';
import { apiClient } from '@/lib/api-client';

export default function CreateChapter() {
  const router = useRouter();
  const { id } = router.query;
  const createChapter = useCreateChapter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    mangaId: id as string,
    chapterNumber: '',
    title: '',
    content: '',
    contentType: ContentType.TEXT,
    status: ChapterStatus.DRAFT,
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
        content: uploadedImages.join('\n'),
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createChapter.mutateAsync({
        ...formData,
        chapterNumber: Number(formData.chapterNumber),
      });
      router.back();
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      contentType: value as ContentType,
      content: '',
    }));
    setPreviewImages([]);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Thêm Chapter Mới</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Số Chapter</label>
            <input
              type="number"
              name="chapterNumber"
              value={formData.chapterNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Loại nội dung</label>
            <select
              name="contentType"
              value={formData.contentType}
              onChange={handleTypeChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value={ContentType.TEXT}>Văn bản</option>
              <option value={ContentType.IMAGE}>Hình ảnh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nội dung</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder={formData.contentType === ContentType.IMAGE ? 'Nhập đường dẫn hình ảnh, mỗi dòng một ảnh' : 'Nhập nội dung chapter'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value={ChapterStatus.DRAFT}>Nháp</option>
              <option value={ChapterStatus.PUBLISHED}>Đã xuất bản</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={createChapter.isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {createChapter.isPending ? 'Đang tạo...' : 'Tạo Chapter'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
} 