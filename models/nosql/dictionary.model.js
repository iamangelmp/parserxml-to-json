const mongoose = require('mongoose');

// Definir el schema para el modelo de datos
const dictionarySchema = new mongoose.Schema({
  ID : Number,
  question: String,
  answare: String,
  keywords: [String],
  comments: String
});

// Definir el modelo utilizando el schema anterior
const dictionary = mongoose.model('concepto', dictionarySchema);

module.exports = dictionary;