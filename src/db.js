const connString = process.env.CONNECTION_STRING;

const sql = require("mssql");

async function getConnection(){
    await sql.connect(connString);
  }

  getConnection();

async function execSQLQuery(sqlQry){
      const request = new sql.Request();
      const {recordset} = await request.query(sqlQry);
      return recordset;
}

module.exports = {
    execSQLQuery
}