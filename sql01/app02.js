const express = require('express')
const mysql = require('mysql2/promise')

const app = express()

const dbInfo = {
  host: 'localhost',
  user: 'root',
  password: 'Codecamp2021',
  database: 'cc13_shop'
}

const pool = mysql.createPool(dbInfo)

let sql = `select p.name AS p_name, p.price AS p_price, c.name AS c_name
from products p 
join category c on p.cat_id = c.id`

pool.query(sql)
.then( ([rows]) => {
  console.log(rows)
  console.log(rows[rows.length-1].p_name)
} )

