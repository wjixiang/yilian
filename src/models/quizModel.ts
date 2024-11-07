import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({  
    name: String,  
    cls: String,  
    numb: String,  
    unit: String,  
    mode: String,  
    test: String,  
    option: [String],  
    answer: String,  
    point: String,  
    discuss: String  
});  

const quiz = mongoose.model('Question', questionSchema);  
export default quiz