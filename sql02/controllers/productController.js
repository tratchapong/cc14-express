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
            res.status(201).json(rs)
        }
    }).catch(next)
}
