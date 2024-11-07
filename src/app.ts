import server from './server';
import quiz from './services/index_quiz';
import path = require('path');

let config = {
  mongoUri:'mongodb://localhost:27017',// MongoDB连接字符串 
  dbName:"note_db", // 数据库名称  
  notesCollectionName:"vault", // 笔记集合名称  
  notesDir:"./content",//笔记目录
  logDir:"./log/sync_log" , //日志目录
  indexDir:path.resolve("./content/info") //索引存储目录
}


class app{
  server;
  quiz
  constructor(){
    this.server = server
    this.quiz = new quiz()
  }
}




export default app




