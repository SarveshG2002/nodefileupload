const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');


const storage =  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'Images')
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));
    }
})


const upload = multer({storage:storage})


const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route to render the EJS template
app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, Express with EJS!' });
});

app.post('/upload',upload.single('fileToUpload'),(req,res)=>{
    res.send("Image Uploaded");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
