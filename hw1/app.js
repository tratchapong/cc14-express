require('dotenv').config()
const fs = require('fs')
const {readFile, writeFile} = require('fs/promises')
const path = require('path')
const express = require('express')
const app = express()

const productsFile = path.resolve('products.json')
const deletedFile = path.resolve('deleted.json')

const getProducts = () => readFile(productsFile, "utf8").then(JSON.parse)
const getDeleted = () => readFile(deletedFile, "utf8").then(JSON.parse)
const saveFile = (file, data) => writeFile(file, JSON.stringify(data, null, 2))

if(!fs.existsSync(deletedFile))
    saveFile(deletedFile, [])

const saveToDeleted = (del_item) => {
    return getDeleted().then((all_del) => {
        console.log('addDeleted :', del_item)
        all_del.push(del_item);
        return saveFile(deletedFile, all_del);
  });
}
  
app.get('/products', (req,res) => {
    const {_page = 1, _limit = 10,_start = 0, _end = 999999} = req.query  
    getProducts().then(all => {
        let productsFilter = (_start!=0 && _end!=999999) 
            ? all.filter(el => el.price >= +_start && el.price <= +_end)
            : all
        let start = (_page-1) * _limit
        let end = start + +_limit 
        let scope_items = productsFilter.slice(start, end)
        console.log(productsFilter.length)
        res.json(scope_items)
    })
})

app.delete('/product/:id', (req, res) => {
    const {id} = req.params
    getProducts().then(all => {
        let del_idx = all.findIndex( el => el.id === +id)
        if(del_idx === -1) 
            return {}
        let [del_item] = all.splice(del_idx, 1)
        saveToDeleted(del_item)
        saveFile('./products.json', all)
        res.json( { msg: `${del_item?.id || 'nothing'} have deleted `})
    })
})

app.get('/products-price', (req, res) => {
    const {_start = 0, _end = 999999} =req.query
    getProducts().then(all => {
        let output = all.filter(el => el.price >= +_start && el.price <= +_end)
        console.log(output)
        res.json(output)
    })
})

app.use((req, res)=> {
    res.status(404).json({msg : "path not found"})
})

let port = process.env.PORT || 8080
app.listen(port, ()=> console.log('Server on',port))
