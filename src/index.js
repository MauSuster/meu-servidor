const express = require("express")
require("dotenv").config();
const connString = process.env.CONNECTION_STRING;
const sql = require("mssql");

const path = require("path")
const app = express()
const router = express.Router()

let connection = null;
async function getConnection(){
  if(connection) return connection;

  await sql.connect(connString);
  return connection
}

async function execSQLQuery(sqlQry){
    await getConnection();
    const request = new sql.Request();
    const {recordset} = await request.query(sqlQry);
    return recordset;

}

app.use(express.static(path.join(__dirname, '/pages/public')));

app.post("/vendedores", async (req, res) =>{
    const { id, nome, email, senha} = req.body;
    await execSQLQuery(`INSERT INTO Vendedores(ID, NOME, EMAIL, SENHA) VALUES (${id}, '${nome}', '${email}', '${senha}')`);
})
app.use("/vendedores/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const results = await execSQLQuery("SELECT * FROM Vendedores WHERE ID=" + id);
    res.json(results);
})

app.use("/vendedores", async (req, res) =>{
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