const express = require('express')
const productRoute = require('./routes/producRoute')

const app = express()

app.use(express.json())


app.use('/product', productRoute)

app.use( (req,res,next)=> {
  res.status(404).json({msg: 'No Service'})
})

app.use( (err, req, res, next) => {
  res.status(500).json({msg: err.message})
})

app.listen(8000, ()=> console.log('Server on 8000..'))
