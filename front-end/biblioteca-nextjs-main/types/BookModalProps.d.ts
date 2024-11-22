interface BookModalProps {
    showForm: boolean;
    editingBook: Books | null;
    onClose: () => void;
    onSubmit: (bookData: Books) => void;
}