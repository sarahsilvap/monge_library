interface BookAddProps {
    showForm: boolean;
    editingBook?: Books | null;
    onClose: () => void;
    onSubmit: (bookData: Books) => void;
}

