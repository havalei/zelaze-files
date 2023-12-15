require('dotenv').config()
const express = require('express');
const app = express(); 
const cors = require('cors');
const multer = require('multer');


app.use(cors({origin:'*'}))

app.use(express.static('uploads'))

const storage = multer.diskStorage({   
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
      }
  })

const upload = multer (
    {storage: storage}
    )

app.post('/files', upload.single('file'), (req, res, next)=>{
    console.log(req.file.filename); 
    res.send(req.file.filename)})

const { PORT} = process.env
app.listen(2556, ()=>{
    console.log(`listening on port ${PORT}`)
})