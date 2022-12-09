import express from "express"
import fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const file = express()

//middleware 
file.use(express.json())

const PORT = process.env.PORT || 4000

//geting data form a file
file.get("/get-file/:filename",function(request,response){
   
    const {filename} = request.params
    fs.readFile(`./FileSystem/${filename}.text`,'utf-8',(err,data)=>{

response.send(data)
    })
   
})

//creating file
file.post("/create-file",function(request,response){
    const date = new Date()
    const stamp = Date.now()

    const name = date.toString().split("")
    const data = stamp.toString()


for(var i=0;i< name.length;i++){
    if(name[i] === ":"){
var delets = delete name[i]
    }
}
const filename =name.join('')

    fs.writeFile(`./FileSystem/${filename}.text`,data,(err)=>{

    })

    response.send("file created sucessfully" )
   
})


//adding data to exing file
file.put("/add-data/:filename",function(request,response){
   
    const {filename} = request.params

    const data =request.body.data



    fs.appendFile(`./FileSystem/${filename}.text`,'\n' + data,(err)=>{

    })
   response.send("add data sucessfully")
})


//deleting a file
file.delete("/delete-file/:filename",function(request,response){
   
    const {filename} = request.params


    fs.unlink(`./FileSystem/${filename}.text`,(err)=>{

    })
   response.send(`sucessfully deleted file ${filename}`)
})

file.listen(PORT)

