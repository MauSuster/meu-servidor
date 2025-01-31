const express = require("express")
require("dotenv").config();
const connString = process.env.CONNECTION_STRING;

const path = require("path")
const app = express()
const router = express.Router()


app.use(express.static(path.join(__dirname, '/pages/public')));

router.get("/calculoInt", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/calculoInt.html" ))
})

router.get("/calculoNac", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/calculoNac.html" ))
})

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/home.html" ))
})

router.get("/menu", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/menu.html" ))
})

router.get("/result", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/result.html" ))
})

router.get("/resultInt", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/resultInt.html" ))
})

app.use(router)

app.listen(3333, ()=>{
    console.log("server on")
})