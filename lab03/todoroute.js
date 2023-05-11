const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'from /todos'})
})

router.get('/all', (req, res)=> {
    res.json({msg: 'from /todos/all'})
})

module.exports = router