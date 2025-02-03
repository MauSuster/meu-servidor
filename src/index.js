const express = require("express")
require("dotenv").config();

const { execSQLQuery } = require("./db");
const path = require("path");
const app = express()
const router = express.Router()

app.use(express.static(path.join(__dirname, '/pages/public')));

app.use(express.json());

app.delete("/vendedores/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await execSQLQuery("DELETE FROM Vendedores WHERE ID=" + id);
    res.sendStatus(204);
})

app.patch("/vendedores/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;
    await execSQLQuery(`UPDATE Vendedores SET NOME='${nome}', EMAIL='${email}',SENHA='${senha}' WHERE ID=${id}`);
    res.sendStatus(200);
})

app.post("/vendedores", async (req, res) =>{
    const { id, nome, email, senha} = req.body;
    await execSQLQuery(`INSERT INTO Vendedores(ID, NOME, EMAIL, SENHA) VALUES (${id}, '${nome}', '${email}', '${senha}')`);
    res.sendStatus(201);
})

app.get("/vendedores/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const results = await execSQLQuery("SELECT * FROM Vendedores WHERE ID=" + id);
    res.json(results);
})

app.get("/vendedores", async (req, res) =>{
    const results = await execSQLQuery("SELECT * FROM Vendedores");
    res.json(results);
})



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