import { Request, Response } from 'express';

export const wiki_homepage = (_req:Request,res:Response)=>{ 
    res.send("welcom to my clinical wiki!")
}

export const find_by_title = async (req:Request,res:Response)=>{
    const query_title = req.query.title
    res.send(0)
}