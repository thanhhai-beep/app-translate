import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useManga, useUpdateManga, useDeleteManga } from '@/hooks/useManga';
import { useCategories } from '@/hooks/useCategory';
import { MangaType, MangaStatus } from '@/types/manga';
import MainLayout from '@/layouts/MainLayout';
import { apiClient } from '@/lib/api-client';
import { Manga } from '@/types/manga';
import PageTitle from '@/components/PageTitle';

interface UpdateMangaFormData extends Partial<Manga> {
  categoryIds: string[];
}

export default function EditManga() {
  const router = useRouter();
  const { id } = router.query;
  const mangaId = id as string;
  const { data: mangaData, isLoading } = useManga(mangaId);
  const updateManga = useUpdateManga();
  const deleteManga = useDeleteManga();
  const { data: categoriesData } = useCategories(1, 100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<UpdateMangaFormData>({
    title: '',
    description: '',
    author: '',
    type: MangaType.TEXT,
    status: MangaStatus.ONGOING,
    coverImage: '',
    categoryIds: [],
  });

  const [previewImage, setPreviewImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (mangaData) {
      setFormData({
        title: mangaData.title,
        description: mangaData.description,
        author: mangaData.author,
        type: mangaData.type,
        status: mangaData.status,
        coverImage: mangaData.coverImage,
        categoryIds: mangaData.categories?.map((c: any) => c.id) || [],
      });
      if (mangaData.coverImage) {
        setPreviewImage(mangaData.coverImage);
      }
    }
  }, [mangaData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post<{ path: string }>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData(prev => ({
        ...prev,
        coverImage: `${process.env.NEXT_PUBLIC_API_URL}${response.data.path}`,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mangaId) return;
    
    try {
      const { categoryIds, ...mangaData } = formData;
      
      await updateManga.mutateAsync({
        id: mangaId,
        manga: {
          ...mangaData,
          categoryIds: categoryIds,
        },
      });
      router.push('/manga');
    } catch (error) {
      console.error('Failed to update manga:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <PageTitle title="Manga | Details" description="View and edit manga details" />
        <div className="p-6">Loading...</div>
      </MainLayout>
    );
  }

  if (!mangaData) {
    return <div>Loading...</div>;
  }
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this manga?')) {
      deleteManga.mutate(id as string);
      router.push('/manga');
    }
  };

  return (
    <MainLayout>
      <PageTitle title={`${mangaData?.title || 'Manga'} | Details`} description="View and edit manga details" />
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-1">Chỉnh sửa truyện</h1>
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Tác giả
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
            <label className="block text-sm font-medium text-gray-700">
              Thể loại
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {categoriesData?.categories.map((category) => (
                <label key={category.id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.categoryIds.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Loại truyện
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={MangaType.TEXT}>Truyện chữ</option>
              <option value={MangaType.COMIC}>Truyện tranh</option>
            </select>
          </div>

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
              <option value={MangaStatus.ONGOING}>Đang tiến hành</option>
              <option value={MangaStatus.COMPLETED}>Hoàn thành</option>
              <option value={MangaStatus.HIATUS}>Tạm ngưng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ảnh bìa
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
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
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/manga')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={updateManga.isPending || isUploading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {updateManga.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
} 