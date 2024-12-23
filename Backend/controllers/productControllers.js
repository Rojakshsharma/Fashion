import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
// function for add product
const addProduct = async(req,res)=>{
    try {
        const {name,description,price,category,subcategory,sizes,bestseller}=req.body
        const images = []

        // checking if the images exits or not 
        if (req.files.image1) {
            images.push(req.files.image1[0]);
        }

        if (req.files.image2) {
            images.push(req.files.image2[0]);  
        }

        if (req.files.image3) {
            images.push(req.files.image3[0]);
        }

        if (req.files.image4) {
            images.push(req.files.image4[0]);
        }
    
        // uploading it to the cloudinary
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subcategory,
            bestseller:bestseller==="true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }


        console.log(productData)

        const product= new productModel(productData)
        await product.save()

        res.json({success:true,message:"product added"})

    } catch (error) {
        res.json({success:false,message:error.message})  
    }
}


// function for list product
const listProduct = async(req,res)=>{
    try {
        const products = await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
         res.json({success:false,message:error.message})
    }
}

// function for remove product
const removingProduct = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed"})
    }catch(error){
        res.json({success:false,message:error.message})    
    }
}

// function for single  product info
const singleProduct = async(req,res)=>{
    try {
        const {id} = req.body
        const product = await productModel.findById(id)
        res.json({success:true,product})
    } catch (error) {
        res.json({success:false,message:error.message})  
    }
}

export {addProduct,listProduct,removingProduct,singleProduct}