import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import userRouter from './routers/userRouter.js';
import body_Parser from 'body-Parser';
import productRouter from './routers/productRouter.js';

 //const mongoose=require('mongoose');
 //const body_Parser=require('body-parser');
 const app=express();
 //const userRouter=express.Router();
app.use(body_Parser());
app.use(cors(''));
mongoose.connect("mongodb+srv://chaitanya:qwerty@Q12@cluster0.1btgt.mongodb.net/Amazonadb?retryWrites=true&w=majority",
{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true,}
);

mongoose.connection.once('open',()=>{
    console.log("conected to db");
}).on('connectionError',(err)=>{
    console.log(err);
})

  
  
  app.use('/api/users', userRouter);
  app.use('/api/products',productRouter);
  app.get('/', (req, res) => {
    res.send('Server is ready');
  });
  
  app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });
  
  const port = process.env.PORT || 5005;
  app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
  });