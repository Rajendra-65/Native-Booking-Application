import express from "express";
import cloudinary from "../lib/cloudinary";
import Book from "../models/Book";
const router = express.Router();

router.post("/",async(req,res)=>{
    try{
        const { title , caption , rating , image } = req.body;

        if(!image || !title || !caption || !rating ){
            return res.status(400).json({
                message: "please provide all details"
            })
        }

        // upload to cloudinary
        const result = await cloudinary.uploader.upload(image);
        const imageUrl = result.secure_url;
        // Save to Db
        const newBook = new Book({
            title,
            caption,
            rating,
            image: imageUrl,
    
        })

        await newBook.save()

        res.status(201).json(newBook)

    }catch(e){
        console.log("error in the post route",e)
        res.status(500).json({
            message:e
        })
    }
})

export default router;