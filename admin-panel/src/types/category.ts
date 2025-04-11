export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  categories: Category[];
  total: number;
} 