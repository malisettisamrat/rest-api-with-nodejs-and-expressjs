const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name : String,
    description : String,
    image : String,
    price : Number,
    reviews : [ 
        { name : String,
          comments : String,
          rating : Number 
        } 
    ],

})

module.exports = mongoose.model('product', productSchema)