require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

const pool = mysql.createPool(process.env.DB_CONNECT);

app.get("/products", (req, res, next) => {
  pool
    .query("select * from produ")
    .then(([rows]) => res.json(rows))
    .catch((err) => next(err));
});

// Lab
// รับ request 'get' ที่ '/product/2'
// แล้วแสดง product ที่มี id=2 ตาม param ที่ส่งมา

app.get("/product/:id", (req, res, next) => {
  const { id } = req.params;
  // SQL Injection ALERT!!!
  //  pool.query(`select * from products where id=${id}`)
  //  .then( (([row]) => res.json(row)))
  //  .catch(next)

  // Prepared statement : protect SQL injection 
  pool
    .query("select * from products where id=?", [id])
    .then(([row]) => res.json(row))
    .catch(next);
});

// not found
app.use((req, res) => {
  res.status(404).json({ msg: "path not found" });
});

// error
app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message });
});

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on port", port));
