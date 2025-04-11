import { useRouter } from 'next/router';
import { useChapters, useDeleteChapter } from '@/hooks/useChapter';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';
import PageTitle from '@/components/PageTitle';

interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  status: string;
  createdAt: string;
}

export default function ChaptersListPage() {
  const router = useRouter();
  const { id: mangaId } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useChapters(mangaId as string, currentPage, pageSize);
  const deleteChapter = useDeleteChapter();

  const handleEdit = (chapterId: string) => {
    router.push(`/manga/${mangaId}/chapters/${chapterId}`);
  };

  const handleDelete = (chapterId: string) => {
    if (confirm('Are you sure you want to delete this chapter?')) {
      deleteChapter.mutate({ mangaId: mangaId as string, chapterId });
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <PageTitle title="Chapters | Management" description="Manage manga chapters and translations" />
        <div className="p-6">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTitle title="Chapters | Management" description="Manage manga chapters and translations" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chapters Management</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => router.push(`/manga/${mangaId}/chapters/create`)}
          >
            Add Chapter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chapter Number
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((chapter) => (
                <tr key={chapter.id}>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {chapter.chapterNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {chapter.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      chapter.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                      chapter.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {chapter.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {chapter.createdAt ? new Date(chapter.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEdit(chapter.id || '')}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(chapter.id || '')}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select
              className="border rounded px-2 py-1"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {Math.ceil((data?.total || 0) / pageSize)}
            </span>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= Math.ceil((data?.total || 0) / pageSize)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 