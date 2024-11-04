const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
})

//exportanto o modelo paa salvar os livros

module.exports = mongoose.model('Category', categorySchema);