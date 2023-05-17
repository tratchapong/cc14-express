const Products = require("../models/Products");

exports.getAllProducts = (req, res, next) => {
  Products.findAll()
    .then((row) => {
      res.json(row);
    })
    .catch(next);
};

exports.getProductById = (req, res, next) => {
  const { id } = req.params;
  Products.findId(id).then((row) => {
    res.json(row);
  }).catch(next);
};

exports.createProduct = (req, res, next) => {
    Products.create(req.body).then(rs => {
        console.log(rs)
        if(rs.affectedRows>=1){
            return res.status(201).json(rs)
        } 
        throw new Error('Cannot create')
    }).catch(next)
}

exports.deleteProducts = (req, res, next) => {
  const {id} = req.params
  Products.delete(id).then(rs => {
    if(rs.affectedRows>=1){
      res.json({msg: "delete ok"})
    } else {
      // res.status(500).json({err: 'cannot delete'})
      const c_err =  new Error(`Cannot Delete id : ${id}`)
      c_err.statusCode = 444
      throw c_err
    }
  }).catch(err => next(err))
}

exports.updateProducts = (req, res, next) => {
  const {id} = req.params
  Products.update(id, req.body).then(rs=> {
    console.log(rs)
    if(rs.affectedRows>=1){
        return res.json(rs)
    } 
    throw new Error('Cannot Update')
  }).catch(next)
}

exports.getProductByName = (req, res,next) => {
  const {name} = req.query
  console.log(name)
  Products.findByName(name).then(row => {
    res.json(row)
  }).catch(next)
}

