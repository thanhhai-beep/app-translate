import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { Category, CategoryResponse } from '../types/category';

export const useCategories = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['categories', page, pageSize],
    queryFn: async () => {
      const { data } = await apiClient.get<CategoryResponse>(`/categories?page=${page}&limit=${pageSize}`);
      return data;
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { data } = await apiClient.post<Category>('/categories', category);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category created successfully');
    },
    onError: () => {
      console.log('Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...category }: Partial<Category> & { id: string }) => {
      const { data } = await apiClient.patch<Category>(`/categories/${id}`, category);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category updated successfully');
    },
    onError: () => {
      console.log('Failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      console.log('Category deleted successfully');
    },
    onError: () => {
      console.log('Failed to delete category');
    },
  });
}; 