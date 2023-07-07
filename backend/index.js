const express = require("express");
const { Socket } = require( "socket.io");
const app = express();
const http = require("http");
const {Server} = require('socket.io')
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");
const server = http.createServer(app)

const io = new Server(
  server,{cors:{
      origin:"http://localhost:3001",
      methods: ["GET", "POST"]
  },
})



app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://Muawizkhan:ctfevent@ctf-cluster.w0m8duj.mongodb.net/CTF"
);

app.get("/getUsers", async (req, res) => {
const response = await UserModel.find()
res.json(response)
});

app.post("/createUser", async (req, res) => {
const user = req.body;
const newUser = new UserModel(user);
await newUser.save();

res.json(newUser);
});

app.put("/update", async (req, res) => {
    const fid = req.body.id
    const updatedScore = req.body.score
    try {
        await UserModel.findByIdAndUpdate(fid, {$set:{score:updatedScore}})
    
      } catch(err) {
        console.log(err)
      }
    res.json("updated");
});

server.listen(3001, () => {
console.log("SERVER RUNS PERFECTLY!");
});

let level1 = false;
let level2 = false;
let level3 = false;
let level4 = false;
let level5 = false;
let level6 = false;
let lev1_arr = [];
let lev2_arr = [];
let lev3_arr = [];
let lev4_arr = [];
let lev5_arr = [];
let lev6_arr = [];

io.on("connection",(socket)=>{
    console.log("user connected with a socket id", socket.id)
    socket.on("updateScore_lev1", (myData)=>{

        userid = myData.userid
        userscore = myData.score
        if (level1 == false)
        {
            level1=true;
            userscore = userscore + 10;
        }
        else
        {
            userscore = userscore + 5;
        }
        if (lev1_arr.includes(userid) == false)
        {
            lev1_arr.push(userid)
            socket.emit("finishupdate1", {score:userscore})
        }
    })
    socket.on("updateScore_lev2", (myData)=>{

        userid = myData.userid
        userscore = myData.score
        if (level2 == false)
        {
            level2=true;
            userscore = userscore + 10;
        }
        else
        {
            userscore = userscore + 5;
        }
        if (lev2_arr.includes(userid) == false)
        {
            lev2_arr.push(userid)
            socket.emit("finishupdate2", {score:userscore})
        }
    })
    socket.on("updateScore_lev3", (myData)=>{

        userid = myData.userid
        userscore = myData.score
        if (level3 == false)
        {
            level3=true;
            userscore = userscore + 10;
        }
        else
        {
            userscore = userscore + 5;
        }
        if (lev3_arr.includes(userid) == false)
        {
            lev3_arr.push(userid)
            socket.emit("finishupdate3", {score:userscore})
        }
    })
    socket.on("updateScore_lev4", (myData)=>{

        userid = myData.userid
        userscore = myData.score
        if (level4 == false)
        {
            level4=true;
            userscore = userscore + 10;
        }
        else
        {
            userscore = userscore + 5;
        }
        if (lev4_arr.includes(userid) == false)
        {
            lev4_arr.push(userid)
            socket.emit("finishupdate4", {score:userscore})
        }
    })
    socket.on("updateScore_lev5", (myData)=>{

        userid = myData.userid
        userscore = myData.score
        if (level5 == false)
        {
            level5=true;
            userscore = userscore + 10;
        }
        else
        {
            userscore = userscore + 5;
        }
        if (lev5_arr.includes(userid) == false)
        {
            lev5_arr.push(userid)
            socket.emit("finishupdate5", {score:userscore})
        }
    })
    socket.on("updateScore_lev6", (myData)=>{

        userid = myData.userid
        userscore = myData.score
        if (level6 == false)
        {
            level6=true;
            userscore = userscore + 10;
        }
        else
        {
            userscore = userscore + 5;
        }
        if (lev6_arr.includes(userid) == false)
        {
            lev6_arr.push(userid)
            socket.emit("finishupdate6", {score:userscore})
        }
    })
})