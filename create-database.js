require("dotenv").config();

const connString = process.env.CONNECTION_STRING;
const sql = require("mssql");

async function createTable(){
    try{
        await sql.connect(connString);
        const table = new sql.Table("Vendedores");
        table.create = true;
        table.columns.add("ID", sql.Int, {nullable: false, primary: true, identity: true})
        table.columns.add("NOME", sql.NVarChar(150), {nullable: false})
        table.columns.add("EMAIL", sql.NVarChar(30), {nullable:false})
        table.columns.add("SENHA", sql.NVarChar(30), {nullable:false})

        table.rows.add(1, "MAURICIO", "sustermauricio@gmail.com", "123");

        const request = new sql.Request();
        await request.bulk(table);
        console.log("funcionou cabra");


    }
    catch(err){
        console.log(err);
    }
}

createTable();