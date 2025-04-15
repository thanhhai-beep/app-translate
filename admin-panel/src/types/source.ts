export enum SourceType {
  MANGADEX = 'mangadex',
  MANGABAT = 'mangabat',
  MANGAFOX = 'mangafox',
  CUSTOM = 'custom'
}

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  baseUrl: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 