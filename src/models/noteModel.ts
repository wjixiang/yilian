import { link } from 'fs';
import mongoose from 'mongoose';  

const noteSchema = new mongoose.Schema({  
    history:[{
        title: { type: String, required: true },  
        content: { type: String, required: true },  
        date:{type: Date, default: Date.now},
    }],
    tags: { type:Array },
    inlink: { type:Array },
    outlink: { type:Array },
});  

const noteModel = mongoose.model('note_vaults', noteSchema);  
export default noteModel;
