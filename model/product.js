const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const product = new Schema({

  title:String,
  Price:String

})
const ProductData = mongoose.model('product',product);
 module.exports = ProductData
