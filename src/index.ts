import express from 'express';  
import * as os from "os"
import * as path from "path"

const app = express();  
const PORT = process.env.PORT || 3000;  
const user = os.userInfo()

console.log("hello!!") 
 
app.get('/', (_req, res) => {  
    res.send("hello");  
});  

app.get('/vault', (_req, res) => {  
    res.send("hi");  
});  

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
}); 