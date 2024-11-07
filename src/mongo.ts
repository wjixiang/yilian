import mongoose from "mongoose"

mongoose.connect('mongodb://localhost:27017/note_db').then(()=>{
    console.log('\x1b[34m'+"MongoDB connected"+'\x1b[0m')
  })