const express = require("express")
require("dotenv").config();

const { execSQLQuery } = require("./src/db");
const path = require("path");
const app = express()
const router = express.Router()

app.use(express.static(path.join(__dirname, '/src/pages/public')));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/home.html"));

app.use(express.json());

});



const http = require('http');

const teste = '/rest/Users/GetUserId/'
const teste2 = '/rest/api/supply/v2/PriceListHeaderItems?code=ECO'

//conexão com o rest
const options = {
  hostname: '177.139.130.247',
  port: 9094,
  path: teste,
  auth: 'FATURAMENTO:123',  
  headers: {
    'User-Agent': 'Node.js'
  }
};

// Rota que age como proxy para o endpoint remoto
app.get('/api/getUserId', (req, res) => {
    
  
    http.get(options, (response) => {
      let data = '';
  
      response.on('data', (chunk) => {
        data += chunk.toString();
      });
  
      response.on('end', () => {
        // Aqui você pode opcionalmente tratar ou verificar o JSON recebido
        res.send(data);
      });
  
    }).on('error', (error) => {
      console.error('Erro ao buscar dados:', error);
      res.status(500).send({ error: 'Erro ao buscar dados' });
    });
  });

app.use(router)

app.listen(3333, ()=>{
    console.log("server no ar")
})