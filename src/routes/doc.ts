import express, { Request, Response, Router } from 'express';  
import noteModel from '../models/noteModel';

const router: Router = express.Router();  

const documents:{
    [key:number]: {title:string,content:string}
} = { 
    1: { title: '文档 1', content: '这是文档 1 的内容' },  
    2: { title: '文档 2', content: '这是文档 2 的内容' },  
    3: { title: '文档 3', content: '这是文档 3 的内容' },  
  };  

router.get('/:id', async (req, res) => {  
    const docId = req.params.id
    // console.log(docId)
    
    const document = await findById(docId)
    
    if (document) {  
        console.log(document)
        res.send(document);  
    } else {  
        res.status(404).send('文档未找到');  
    }  
});  

const findById = async (id:string)=>{
    const result = await noteModel.findById(id).select('title')
    return(result)
}

export default router