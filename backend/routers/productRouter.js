import express from 'express';
import data from '../data.js'
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send("data inserted");
}))
productRouter.get('/:id',expressAsyncHandler(async(req, res)=>{
   const products=await Product.findById(req.params.id);
   if(products)
   {
       res.send(products);
   }
   else
   {
       res.status(404).send({message:'Product Not Found'});
   }
}))

export default productRouter;