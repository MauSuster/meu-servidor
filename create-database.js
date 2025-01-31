require("dotenv").config();

const connString = process.env.CONNECTION_STRING;
const sql = require("mssql");

async function createTable(){
    try{
        await sql.connect(connString);
        console.log("conectou");

    }
    catch(err){
        console.log(err);
    }
}

createTable();