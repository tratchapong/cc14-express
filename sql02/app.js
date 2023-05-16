require('dotenv').config()
const express = require('express')
const mysql = require('mysql2/promise')
const productsRoute = require('./routes/productsRoute')
const categoryRoute = require('./routes/categoryRoute')

const app = express()

app.use(express.json())

app.use(['/products', '/product'], productsRoute)
app.use('/category', categoryRoute)


// not found
app.use((req, res) => {
    res.status(404).json({msg: 'path not found'})
})

// error 
app.use((err, req, res, next)=> {
    res.status(500).json({error : err.message})
})


let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on port', port))