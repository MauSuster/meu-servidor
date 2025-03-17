const express = require("express");
const routes = express.Router();
const app = express();
const http = require('http');

require("dotenv").config();
const { execSQLQuery } = require("./db");




const teste = '/rest/Users/GetUserId/'
const teste2 = '/REST/PORTAL_CONSULTA?CODPRODUTO=TL7002'

routes.use(express.json());

//conexão com o rest
const options = {
  hostname: '177.139.130.247',
  port: 9094,
  path: teste2, 
  headers: {
    'Content-Type': 'application/json'
  }
};

routes.get('/api/getUserId', (req, res) => {
    
  
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

// Rota para buscar estoque


routes.get('/api/estoque', (req, res) => {
  const produto = req.query.produto;
  const options = {
    hostname: '177.139.130.247',
    port: 9094,
    path: `/REST/PORTAL_CONSULTA?CODPRODUTO=${encodeURIComponent(produto)}`,
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json; charset=UTF-8'
    }
  };
  http.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk.toString();
    });

    response.on('end', () => {
      res.send(data);
    });
  }).on('error', (error) => {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  });
});

routes.get('/api/pedido', (req, res) => {
  const vendedor = req.query.vendedor;
  const options = {
    hostname: '177.139.130.247',
    port: 9094,
    path: `/REST/PEDIDO_CONSULTA?VENDEDOR=${encodeURIComponent(vendedor)}`,
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json; charset=UTF-8'
    }
  };
  http.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk.toString();
    });

    response.on('end', () => {
      res.send(data);
    });
  }).on('error', (error) => {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  });
});

routes.get('/api/detalhePedido', (req, res) => {
  const pedido = req.query.pedido;
  const options = {
    hostname: '177.139.130.247',
    port: 9094,
    path: `/REST/PEDIDO_DESC_CONSULTA?PEDIDO=${encodeURIComponent(pedido)}`,
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json; charset=UTF-8'
    }
  };
  http.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk.toString();
    });

    response.on('end', () => {
      res.send(data);
    });
  }).on('error', (error) => {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  });
});

routes.get('/api/IDPedido', (req, res) => {
  const pedido = req.query.pedido;
  console.log(pedido)
  const options = {
    hostname: '177.139.130.247',
    port: 9094,
    path: `/REST/PEDIDO_UN_CONSULTA?PEDIDO=${encodeURIComponent(pedido)}`,
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json; charset=UTF-8'
    }
  };
  http.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk.toString();
    });

    response.on('end', () => {
      res.send(data);
    });
  }).on('error', (error) => {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  });
});



routes.post('/login', async (req, res) => {
    console.log("Body recebido:", req.body); // Verifica o body
    const { email, senha } = req.body;
    const query = `SELECT 1 FROM Vendedores WHERE EMAIL = '${email}'`;
    const results = await execSQLQuery(query); 

    if (results.length === 0) {
        return res.status(404).json({ error: "Vendedor não encontrado" });
    }
    else
    {
    const query = `SELECT 1 FROM Vendedores WHERE EMAIL = '${email}' AND SENHA ='${senha}'`;
    const results = await execSQLQuery(query);       
    if (results.length === 0) {
        return res.status(401).json({ error: "Senha errada" });
    }
    else
    {
      res.json(results);
    }
  }
});

routes.get("/vendedores", async (req, res) =>{
    const results = await execSQLQuery("SELECT * FROM Vendedores");
    res.json(results);
})

module.exports = routes;