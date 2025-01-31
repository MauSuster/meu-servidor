const express = require("express")

const path = require("path")
const app = express()
const router = express.Router()

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/home.html" ))
})

router.get("/dashboard", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/dashboard.html" ))
})

router.get("/index", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/index.html" ))

})

router.get("/main", (req, res)=>{
    res.sendFile(path.join(__dirname + "/pages/main.js" ))
})

app.use(router)

app.listen(3333, ()=>{
    console.log("server on")
})