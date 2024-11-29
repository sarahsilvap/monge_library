const axios = require('axios');

//Cria instância di Axios com URL base da API
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/books', 
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

//Exporta funções CRUD usando Axios

export default {
    getBooks() {
        return apiClient.get('/');
    },
    addBook(book) {
        return apiClient.post('/', book);
    },
    updateBook(id, book) {
        return apiClient.put(`/${id}`, book);
    },
    deleteBook(id){
        return apiClient.delete(`/${id}`);
    },
};