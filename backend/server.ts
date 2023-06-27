// const { Socket } = require( "socket.io");

const express = require("express");
const app = express();
const http = require("http");
const {Server} = require('socket.io')
const cors = require('cors')

const mongoose = require('mongoose')


app.use(cors())
app.use(express.json());
const server = http.createServer(app)
const io = new Server(
    server,{cors:{
        origin:"http://localhost:8000",
        methods: ["GET", "POST"]
    },
})



mongoose.connect("mongodb://localhost:27017/CTF",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
}


//user schema 
const students = new mongoose.Schema({
    password: {type: String, index : true},
    email : {type:String}
})

const User = new mongoose.model("Students", students)

app.post("/signup",(req:any,res:any)=>{
    // console.log("user created" , req.body)
    User.create(req.body)
    res.send("user successfully created")
});




server.listen(8000, ()=>{
    console.log("SERVER IS LISTENING ON PORT 8000")
})
