const express = require('express')

const router = express.Router();

const productSchema = require('../model/schema');

// Getting all Products List 

router.get('/', async(req, res) => {
    
    let productsList = [];

    productsList = await productSchema.find()
    
    let products = [];

    products = productsList.map( (product, index) => {

        let totalSum = 0

        for(let obj in product.reviews) {
            totalSum += product.reviews[obj].rating
        }

        let aggregate = (totalSum / product.reviews.length)

        return {

            id : product.id,
            name : product.name,
            description : product.description,
            image : product.image,
            price : product.price,
            reviews : product.reviews,
            aggregateReview : aggregate

        }
    })

    res.status(200).send(products);
})

// Add a Product which have name, image, price and reviews array 

router.post('/', async(req, res) => {

    const posts = new productSchema({

        name : req.body.name,
        image : req.body.image,
        description : req.body.description,
        price : req.body.price,
        reviews : req.body.reviews

    })

    const SavedPost = await posts.save();
    res.json(SavedPost)

})

// Get only the name, image, price and Aggregate rating

router.get('/few', async(req, res) => {

    let productsList = [];

    productsList = await productSchema.find()
    
    let products = [];

    products = productsList.map( (product, index) => {

        let totalSum = 0
        for(let obj in product.reviews) {
            totalSum += product.reviews[obj].rating
        }

        let aggregate = ( totalSum / product.reviews.length)

        return {

            id : product.id,
            name : product.name,
            image : product.image,
            price : product.price,
            aggregateReview : aggregate

        }
    })

    res.status(200).send(products);

})

// Update the product Item with ID 

router.put('/:id', (req, res) => {

    productSchema.findByIdAndUpdate( req.params.id, req.body, (err, Obj) => {
        if(err)
            res.status(404).send('Not Found')
        else
            res.status(200).json(Obj)
    })
    
    
})

// showing specific product with all fields and aggregate rating 

router.get('/:id', async(req, res) => {
    
    let productsList = [];

    productsList = await productSchema.find()
    
    let products = [];

    products = productsList.map( (product, index) => {

            if(product.id == req.params.id) {

                let totalSum = 0

                for(let obj in product.reviews) {
                    totalSum += product.reviews[obj].rating
                }

                let aggregate = (totalSum / product.reviews.length)

                return {

                    id : product.id,
                    name : product.name,
                    description : product.description,
                    image : product.image,
                    price : product.price,
                    aggregateReview : aggregate

                }
            }
        })

    res.status(200).send(products);

})

// delete the specific product with given id

router.delete('/:id', async(req, res) => {

    const removePost = await productSchema.findByIdAndDelete( req.params.id )

})

module.exports = router;