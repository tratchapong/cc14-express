const express = require("express");
const db = require("./db");

const app = express();

app.get(["/search", "/find"], (req, res, next) => {
  let { keyword } = req.query;
  let sql = 'Select * From products Where name like ?'
  db.runsql(sql,[`%${keyword}%`]).then(rows => {
    console.log(rows)
    res.json(rows)
  })
});

app.listen(8000, () => console.log("Server on 8000"));
