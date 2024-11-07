import express, { Request, Response } from 'express';  

import App from '..';


const router = express.Router();  

router.get('/api/quiz/index/source/:id',async(req:Request,res:Response)=>{
  const quizIndex = await App.quiz.quizIndex
  res.json({
    unitList:quizIndex.map(item=>{
      return item.node
    })
  })
})

router.get('/api/quiz/index/cls/:id',async(req:Request,res:Response)=>{
  try{
    const unit = req.params.id
    const quizIndex = await App.quiz.quizIndex
    for (let item of quizIndex) {  
          // 检查当前对象的 node 是否与目标值匹配  
          if (item.node === unit) {  
              res.json(item)
          }  
      
    }  
  }catch(e){

  }
})

// 获取特定章节的题目  
router.get('/api/chapter/:id/questions', async (req: Request, res: Response) => {  
  try {  
    const chapterId = req.params.id;  
    console.log(chapterId)
  } catch (error) {  
    console.error('Error fetching chapter questions:', error);  
    res.status(500).json({ error: 'Internal server error' });  
  }  
}); 

export default router