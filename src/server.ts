import mongoose from 'mongoose';

// import { config } from './app';

import wikiRoute from './routes/wiki';
import express, { Request,Response}  from 'express';
// import { Database } from './database';
import bookmark from './routes/bookmarks'
import doc from './routes/doc'
import getdbid from './routes/search_by_DBID'
import titletodbid from './routes/title_to_DBID'
import getimage from './routes/images'
import quiz from './routes/quiz'

import cors from 'cors'



const server = express()

server.use(cors())
server.use(express.json()); 

server.use("/wiki",wikiRoute)
server.use("/api/bookmarks",bookmark)
server.use('/api/documents',doc)
server.use('/api/getdbid',getdbid)
server.use('/api/titletodbid',titletodbid)
server.use('/api/img',getimage)
server.use(quiz)

const PORT = process.env.PORT ||3000
server.listen(Number(PORT),'0.0.0.0', () => {  
  console.log('\x1b[34m'+ `Server is running on port ${PORT}` +'\x1b[34m');  
});  


mongoose.connect('mongodb://localhost:27017/note_db').then(()=>{
  console.log('\x1b[34m'+"MongoDB connected"+'\x1b[0m')
})

export default server