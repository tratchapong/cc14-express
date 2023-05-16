require('dotenv').config()
const mysql = require('mysql2/promise')

// const dbInfo = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// }

// const dbInfo = {
//     host: 'localhost',
//     user: 'root',
//     password: 'Codecamp2021',
//     database: 'cc14_shop'
// }

// mysql://root:password@localhost:port/dbName

// const dbInfo = 'mysql://root:Codecamp2021@localhost:3306/cc14_shop'

const dbInfo = process.env.DB_CONNECT

// mysql.createConnection(dbInfo)
// .then( db => db.query('select * from products'))
// .then(result => console.log(result[0]))

const conn = mysql.createConnection(dbInfo)

// conn.then( db => 
//     db.query('Select * from products').then( result => console.log(result[0]))
// )

// conn.then( db => 
//     db.query('Select * from products').then( ([rows, fields]) => console.log(rows))
// )

// conn.then( db => 
//     db.query('Select * from products').then( ([rows]) => console.log(rows))
// )


conn.then( db => 
    db.query('Select * from products').then( ([rows]) => {
        // console.log(rows)
        console.log(rows[2].price)
    })
)

// Lab
// console.log แสดง product พร้อม category_name

// let sql = 'Select p.name, p.price, c.name As c_name from products p join categories c on p.category_id = c.id'

// conn.then(db=> {
//     db.query(sql).then( ([rows]) => {
//         console.log(rows)
//     })
// })

// console.log แสดงมูลค่ารวมของ products ทั้งหมด

let sql = 'Select sum(quantity * price) As totalPrice from products'

conn.then(db=> {
    db.query(sql).then( ([rows]) => {
        console.log(rows)
    })
})