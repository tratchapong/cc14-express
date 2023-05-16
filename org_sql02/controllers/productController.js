const Product = require('../models/Product')

exports.getAllProducts = (req, res, next) => {
  Product.findAll().then(rows => {
    res.json(rows)
  }).catch(next)
}

exports.getProduct = (req, res, next) => {
  const { id } = req.params
  Product.findById(id).then(rows => {
    res.json(rows)
  }).catch(next)
}

exports.getByName = (req, res, next) => {
  if(!req.query.keyword) 
   return  next()
  const {keyword} = req.query
  Product.findByName(keyword).then(rows=> {
    res.json(rows)
  }).catch(next)
}

exports.createProduct = (req, res, next) => {
  let product = req.body
  Product.create(product).then(rs => {
    console.log(rs)
    if(rs.affectedRows)
      return res.json({id: rs.insertId,...product})
    throw new Error('cannot Create this data')
  }).catch(next)
}

exports.updateProduct = (req, res, next) => {
  let {id} = req.params
  let product = req.body
  Product.update(id, product).then(rs => {
    console.log(rs)
    if(rs.affectedRows)
      return res.json({id,...product})
    throw new Error('cannot update this id')
  }).catch(next)
}

exports.deleteProduct = (req, res, next) => {
  let {id} = req.params
  Product.delete(id).then(rs => {
    console.log(rs)
    if(rs.affectedRows)
      return res.json({msg: `id : ${id} have been deleted`})
    throw new Error('cannot delete this id')
  }).catch(next)
}
