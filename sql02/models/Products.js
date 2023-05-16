const mysql = require('mysql2/promise')

const pool = mysql.createPool(process.env.DB_CONNECT)

exports.findAll = () => {
    let sql = 'Select * from products'
    return pool.query(sql).then( ([rows]) => rows)
}

exports.findId = (id) => {
    let sql = 'Select * from products where id=?'
    return pool.query(sql, [id]).then( ([rows]) => rows)
}

exports.create = (product) => {
    let {name, price, quantity, category_id} = product
    let sql = 'INSERT INTO products (name, price, quantity, category_id) Values (?,?,?,?)'
    return pool.query(sql, [name, price, quantity, category_id])
    .then(([rs]) => rs)
}