import express from "express"
import {PORT} from "./config.js"
import morgan from "morgan"
import cors from "cors"
import {Server as SocketServer} from "socket.io"
import http from "http"

//Initialize server
const app= express()
const server= http.createServer(app)
const io= new SocketServer(server, {
    cors:{
        origin: "http://localhost:3000"
    }
})

//middleware
app.use(cors())
app.use(morgan("dev"))
//config socket.io
io.on("connection", (socket)=>{
console.log(socket.id);
    socket.on("send", (body)=>{
        socket.broadcast.emit("send", {body, from: socket.id.slice(4)})
    })
})

server.listen(PORT)
console.log("PROBANDO");