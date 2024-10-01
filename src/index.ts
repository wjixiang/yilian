import express from 'express';  
import * as os from "os"

const app = express();  
const PORT = process.env.PORT || 3000;  
const user = os.userInfo()

console.log("hello!!") 
 
app.get('/', (_req, res) => {  
    res.send(user);  
});  

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
}); 