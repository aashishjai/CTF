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
let lev1_arr = []

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
})