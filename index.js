const express = require("express")
require("dotenv").config();

const { execSQLQuery } = require("./src/db");
const path = require("path");
const app = express()
const router = express.Router()

app.use(express.static(path.join(__dirname, '/pages/public')));

app.use(express.json());

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + "/src/pages/home.html" ))
})



// Importar o módulo http
const http = require('http');

const teste = '/rest/Users/GetUserId/'
const teste2 = '/rest/api/supply/v2/PriceListHeaderItems?code=ECO'

// Criar um objeto options
const options = {
  hostname: '177.139.130.247',
  port: 9094,
  path: teste,
  auth: 'admin:admin@dva',  
  headers: {
    'User-Agent': 'Node.js'
  }
};

const requisicao = options;

http.get(requisicao, (response) => {
  // Inicializar uma variável para armazenar os dados da resposta
  let data = '';

  // Escutar o evento de dados
  response.on('data', (chunk) => {
    // Anexar o pedaço à variável de dados
    data += chunk.toString();
  });

  // Escutar o evento de finalização
  response.on('end', () => {
    // Registrar o código de status e os cabeçalhos
    console.log(`Status: ${response.statusCode}`);
// console.log(`Cabeçalhos: ${JSON.stringify(response.headers)}`);

    // Analisar os dados como JSON
    const Resposta = JSON.parse(data);
    console.log("tudo:", Resposta);

    // Registrar as informações do tempo
    console.log(`iD: ${Resposta.userID}`);
  });

  // Escutar o evento de erro
  response.on('error', (error) => {
    // Lançar o erro
    throw error;
  });
});

// Rota que age como proxy para o endpoint remoto
app.get('/api/getUserId', (req, res) => {
    const options = {
      hostname: '177.139.130.247',
      port: 9094,
      path: '/rest/Users/GetUserId/',
      auth: 'admin:admin@dva', 
      headers: {
        'User-Agent': 'Node.js'
        // Se precisar de autenticação, inclua o header Authorization aqui
      }
    };
  
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