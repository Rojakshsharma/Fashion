import express from 'express'
import {addProduct,listProduct,removingProduct,singleProduct} from '../controllers/productControllers.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAutho.js'
const productRouter = express.Router()

productRouter.post("/add",adminAuth,
    upload.fields([
        {name:"image1",maxCount:1},
        {name:"image2",maxCount:1},
        {name:"image3",maxCount:1},
        {name:"image4",maxCount:1}
    ]),addProduct)
productRouter.post("/remove",adminAuth,removingProduct)
productRouter.post("/single",singleProduct)
productRouter.get("/list",listProduct) 

export default productRouter