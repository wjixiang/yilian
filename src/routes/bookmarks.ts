
import express, { Request, Response, Router } from 'express';  
import {getNestedResults} from '../services/index_quiz'

const router: Router = express.Router();  

// 示例书签数据  
interface Bookmark {  
    id: string,  
    title: string,  
    children:Bookmark[]
}  


// 获取书签列表  
router.get('/', (_req: Request, _res: Response) => {  
    getNestedResults().then((res)=>{
        _res.json(res)
    })
    
});  

router.get('')

export default router;