const mysql = require('mysql2/promise')
const dbInfo = {
  host: 'localhost',
  user: 'root',
  password: 'Codecamp2021',
  database: 'cc13_shop'
}

const pool = mysql.createPool(dbInfo)

function runsql(sql, params) {
  return pool.query(sql,params).then(([rows]) => {
    return rows
  })
}

module.exports = {pool, runsql}