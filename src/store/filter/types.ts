export interface filterStore {
  title: string;
  categoryId: string;
  searchTerm: string;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
  setSearchTerm: (searchTerm: string) => void;
}
