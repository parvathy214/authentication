const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')




const  mongoose = require('./db.js')
const app = express();



app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const api = require('./routes/api.js')
app.use('',api)




//authentication
const jwt = require('jsonwebtoken')
app.post('/auth' ,async (req,res)=>{

    try {
        let { email,password } =req.body
    console.log(req.body)
    if(email=='parvathi' && password =='parvathi123'){
        let payload ={email:email,password:password}
        let token = jwt.sign(payload,'ilikeapples13')
        // console.log(token)
        res.status(200).json({ message: 'Authentication successful',status:200,token:token })
    }
    else{
        throw('unauthorized')
    }
    } 
    catch (error) {
        console.log(error)
     res.status(400).json({message:error})
    }
       
   })




app.listen(3000,()=>{
    console.log("server running at 3000")
})