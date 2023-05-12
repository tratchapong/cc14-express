require('dotenv').config()
const {readFile, writeFile} = require('fs/promises')
const express = require('express')
const app = express()

// const getProducts = () => readFile("./products.json", "utf8").then(data => JSON.parse(data))
const getProducts = () => readFile("./products.json", "utf8").then(JSON.parse)
const saveFile = (file, data) => writeFile(file, JSON.stringify(data, null, 2))


app.get('/products', (req,res) => {
    const {_page = 1, _limit = 10} = req.query
    getProducts().then(all => {
        let start = (_page-1) * _limit
        let end = start + +_limit 
        let scope_items = all.slice(start, end)
        console.log(scope_items)
        return scope_items
    }).then( output => res.json(output))
})

app.delete('/product/:id', (req, res) => {
    const {id} = req.params
    getProducts().then(all => {
        let del_idx = all.findIndex( el => el.id === +id)
        if(del_idx === -1) 
            return {}
        let [del_item] = all.splice(del_idx, 1)
        // saveToDeleted
        return {all, del_item}
    }).then( ({all, del_item}) => {
        if(del_item)
            saveFile('./products.json', all)
        return { msg: `${del_item?.id || 'nothing'} have deleted `}
    }).then( msg => res.status(200).json(msg))
})

app.use((req, res)=> {
    res.status(404).json({msg : "path not found"})
})

let port = process.env.PORT || 8080
app.listen(port, ()=> console.log('Server on',port))
