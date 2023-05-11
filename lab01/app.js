require('dotenv').config()
const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log('From first Middleware')
    console.log(req.method)
    console.log(req.baseUrl)
    next()
})

app.get('/', (req, res) => {
    res.send({ msg : 'CC14'})
})

app.get('/date', (req, res) => {
    let current = new Date()
    res.send(current)
})

app.use('/test', (req, res) => {
    res.send({method: req.method, path: req.baseUrl})
})

app.get('/double/:num', (req, res) => {
    const {num} = req.params
    console.log(num)
    // console.log(req.params.num)
    res.send({double : +num * 2})
})

// ให้รับ GET  ที่ path '/add/5/10'
// res.send ===> { result : 15}

app.get('/add/:num1/:num2', (req, res) => {
    const {num1, num2} = req.params
    res.send({result : +num1 + +num2})
})

app.get('/test-query', (req, res) => {
    const { a, b} = req.query
    console.log(req.query)
    console.log(typeof a)
    res.send(req.query)
})

// not found middleware
app.use((req, res) => {
    res.status(404).send({msg: 'Path not found!!'})
})

console.log(process.env.APIKEY)
let port = process.env.PORT || 8080
app.listen(port, ()=>console.log('Server on', port))
