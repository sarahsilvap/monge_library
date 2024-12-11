interface BookShowProps {
  showBook: boolean;
  bookData: {
    title: string;
    author: string;
    synopsis: string;
    category: string;
    year: string;
    coverImage: string;
  } | null;
  onClose: () => void;
  onRent: () => void;
}
