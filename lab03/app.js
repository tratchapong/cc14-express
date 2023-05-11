require('dotenv').config()
const fs = require('fs/promises')
const express = require('express')
const todoRoute = require('./todoroute')
const userRoute = require('./userRoute')

const app = express()

app.use('/users', userRoute)
app.use('/todos', todoRoute)

// app.get('/data', async (req,res,next)=>{
//     // let data = JSON.parse(fs.readFileSync('./data.json'))
//     try {
//         let data = await fs.readFile('./data.json', 'utf8')
//         res.json(JSON.parse(data))
//     }catch(err) {
//         next(err)
//     }
// })

// app.get('/info', (req, res, next) => {
//     fs.readFile('./data.jso', 'utf8').then( data=> {
//         console.log(data)
//         res.json(JSON.parse(data))
//     }).catch(next)
// })

// app.get('/test', (req, res) => {
//     console.log(xxxx)
//     res.send('ok')
// })

app.use((req,res) => {
    res.status(404).json({msg: 'resource not found'})
})

app.use((err,req,res,next) => {
    console.log('Have Error **************')
    console.log(err.message)
    res.status(500).json({err : err.message})
})

const port = process.env.PORT || 8888
app.listen(port, ()=>console.log(`Server on port ${port}`))