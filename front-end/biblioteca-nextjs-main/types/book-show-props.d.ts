interface BookShowProps {
  showBook: boolean;
  bookData: {
    _id: string;
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
