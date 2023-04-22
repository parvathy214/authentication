const express = require('express');
var router = express.Router();
// const jwt = require('jsonwebtoken')
const ProductData = require('../model/product')
// const { response} = require('express')

function verifyToken(req,res,next) {

    try {
        if (!req.headers.authorization) throw ('unauthorized JWT')
        let token = req.headers.authorization.split(' ')[1]
        if (!token) throw ('unauthorized JWT')

        let payload = jwt.verify(token, 'ilikeapples13')

        if (!payload) throw ('unauthorized JWT')

        // res.status(200).send(payload)
        next()

    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }



}


// Read Product
 router.get('/',  async(req,res)=>{
    try {
       let products = await ProductData.find()
       res.json({data:products,message:"success"}).status(200)
        
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }

 })

 //Add Product
router.post('/',verifyToken,async(req,res)=>{
    try {
       let item = req.body
       let token = req.headers
       console.log('token from front end',token)
       if(item== null) throw ('no data')
       const data = new ProductData(item)
       await data.save()
       res.json({ message: 'Data saved successfully' }).status(201)
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
        
    }

})


//Edit Product
router.put('/:id',verifyToken, async(req,res)=>{
    try {
        let id = req.params.id
        let upnew = req.body
        let token = req.headers.authorization
        console.log('token from front end',token)    
        const updatedProduct = await ProductData.findByIdAndUpdate({_id:id},{$set:upnew})
        res.json({message :'Data updated succesfully'}).status(200)
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }

})

//Delete Product
router.delete('/:id',verifyToken, async(req,res)=>{
    try {
    let token = req.headers.authorization
    console.log('token from front end',token)

    let id = req.params.id
    await ProductData.findByIdAndDelete({_id:id})
    res.json({message :'Data deleted succesfully'}).status(200)
        
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
        
    }

    
})






module.exports = router;