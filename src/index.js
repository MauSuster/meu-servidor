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

app.use(router)

app.listen(3333, ()=>{
    console.log("server on")
})