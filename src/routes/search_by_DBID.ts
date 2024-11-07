import express, { Request, Response, Router } from 'express';  
import site from '..';
import noteModel from '../models/noteModel';

const router: Router = express.Router();  

router.get("/:dbid",(req:Request,res:Response)=>{
    const DBID = req.params.dbid
    // console.log(DBID)
    noteModel.findById(DBID)
        .then((note)=>{
            if(!note){
                res.sendStatus(404)
            }else{
                res.json(note)
            }
        })
        .catch((error)=>{
            console.log("DBID format error",error)
        })
})

export default router