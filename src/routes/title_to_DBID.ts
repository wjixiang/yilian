import express, { Request, Response, Router } from 'express';  
import site from '..';
import noteModel from '../models/noteModel';

const router: Router = express.Router();  

router.get("/:title",(req:Request,res:Response)=>{
    const title = req.params.title
    findNotesByTitle(title)
        .then((DBID)=>{
            if(DBID.length>0){
                res.json({
                    status:200,
                    res:DBID[0]
                })
            }else{
                res.json({
                    status:404,
                    res:null
                })
            }
        })
})

async function findNotesByTitle(searchTitle:string) {  
    try {  
        const DBID = await noteModel.find({ 'history.title': searchTitle }).select('_id');  
        return DBID; // 返回匹配的记录  
    } catch (error) {  
        console.error('查询错误:', error);  
        throw error; // 抛出错误以便处理  
    }  
}  

export default router