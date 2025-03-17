const express = require("express")
require("dotenv").config();

const { execSQLQuery } = require("./db");
const path = require("path");
const app = express()
const router = express.Router()
const routes = require('./routes');

app.use(express.urlencoded({ extended: true })); // Permite dados de formulário (se necessário)


app.use(express.static(path.join(__dirname, '/pages/public')));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/home.html"));

app.use(express.json());

});

router.get("/consulta_estoque", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/consulta_estoque.html"));
  

app.use(express.json());

});

router.get("/consulta_pedido", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/consulta_pedido.html"));
  

app.use(express.json());

});

router.get("/pedido/:pedido", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/pedido.html"));
  

app.use(express.json());

});



app.use(router)
app.use(routes)

app.listen(3333, ()=>{
    console.log("server no ar")
})