export interface filterStore {
  title: string;
  categoryId: string;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
}
