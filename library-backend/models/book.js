const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: Number },
  coverImage: { type: String },
});

//exportanto o modelo paa salvar os livros

module.exports = mongoose.model("Book", bookSchema);
