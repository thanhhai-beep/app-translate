import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMangas, useDeleteManga } from '@/hooks/useManga';
import { MangaType, MangaStatus, Manga } from '@/types/manga';
import MainLayout from '@/layouts/MainLayout';

export default function MangaList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useMangas(currentPage, pageSize);
  const deleteManga = useDeleteManga();
console.log(data);

  const handleEdit = (id: string) => {
    router.push(`/manga/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa truyện này?')) {
      deleteManga.mutate(id, {
        onSuccess: () => {
          alert('Xóa truyện thành công');
        },
        onError: () => {
          alert('Xóa truyện thất bại');
        },
      });
    }
  };

  const getStatusColor = (status: MangaStatus) => {
    switch (status) {
      case MangaStatus.ONGOING:
        return 'bg-green-100 text-green-800';
      case MangaStatus.COMPLETED:
        return 'bg-blue-100 text-blue-800';
      case MangaStatus.HIATUS:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: MangaStatus) => {
    switch (status) {
      case MangaStatus.ONGOING:
        return 'Đang tiến hành';
      case MangaStatus.COMPLETED:
        return 'Hoàn thành';
      case MangaStatus.HIATUS:
        return 'Tạm ngưng';
      default:
        return status;
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Quản lý truyện</h1>
            <button
              onClick={() => router.push('/manga/create')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Thêm truyện
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tiêu đề
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tiêu đề gốc
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tác giả
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thể loại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.mangas?.map((manga: Manga) => (
                    <tr key={manga.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{manga.title}</div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{manga.originalTitle}</div>
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{manga.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {manga?.categories?.map((category: any) => (
                            <span
                              key={category.id}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          manga.type === MangaType.COMIC
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {manga.type === MangaType.COMIC ? 'Truyện tranh' : 'Truyện chữ'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(manga.status)}`}>
                          {getStatusText(manga.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(manga.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(manga.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(manga.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-700">
                Hiển thị {((currentPage - 1) * pageSize) + 1} đến {Math.min(currentPage * pageSize, data.total)} trong {data.total} mục
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage * pageSize >= data.total}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 