const express = require("express")
require("dotenv").config();
const connString = process.env.CONNECTION_STRING;

const path = require("path")
const app = express()
const router = express.Router()

let connection = null;
function getConnection(){
  if(connection) return connection;

  connection = sql.connect(connString);
  return connection
}

async function execSQLQuery(sqlQry){
    await getConnection();
    const request = sql.request();
    const {recordset} = await request.query(sqlQry);
    return recordset;

}

app.use(express.static(path.join(__dirname, '/pages/public')));

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