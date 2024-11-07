import express, { Request, Response, Router } from 'express';  
import noteModel from '../models/noteModel';
import path from 'path';
import dotenv from 'dotenv'
import fs from 'fs'

const router: Router = express.Router();  
dotenv.config()
const img_folder = process.env.img_dir_path
router.get('/:imgname', (req:Request, res:Response) => {  
    const req_img = req.params.imgname
    const imagePath = path.resolve(path.join(String(img_folder),req_img)); 
    console.log(imagePath)
    
    fs.readFile(imagePath,(err)=>{
        if(err){
            res.status(404).sendFile(path.resolve(path.join(String(img_folder),'404.jpg')))
        }
        res.sendFile(imagePath)

    })

});  

export default router