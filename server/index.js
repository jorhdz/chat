import express from "express"
import {PORT} from "./config.js"
import morgan from "morgan"
import cors from "cors"
import {Server as SocketServer} from "socket.io"
import http from "http"

const app= express()
const servidor= http.createServer(app)
const io= new SocketServer(servidor, {})


app.use(cors())
app.use(morgan("dev"))
io.on("connection", (socket)=>{
console.log(socket.id);
})

app.listen(PORT)
console.log("PROBANDO");