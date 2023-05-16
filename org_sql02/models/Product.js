const db = require('../utils/db')

exports.findAll = () => {
  let sql = 'Select * from products'
  return db.execute(sql).then(([rs])=> rs)
}

exports.findById = (id) => {
  let sql = 'Select * from products where id = ?'
  return db.execute(sql, [id]).then(([rs])=> rs)
}

exports.findByName = (name) => {
  let sql = 'Select * From products Where name Like ?'
  return db.execute(sql, [`%${name}%`]).then(([rs])=> rs)
}

exports.create = (product) => {
  let {name, price, cat_id} = product
  let sql = 'Insert into products (name, price, cat_id) Values (?,?,?)'
  return db.execute(sql, [name, price, cat_id]).then( ([rs]) => rs )
}

exports.update = (id, product) => {
  let {name, price, cat_id} = product
  let sql = 'Update products Set name=?, price=?, cat_id=? Where id=?'
  return db.execute(sql, [name, price, cat_id, id]).then( ([rs]) => rs)
}

exports.delete = (id) => {
  let sql = 'Delete From products Where id=?'
  return db.execute(sql, [id]).then( ([rs]) => rs)
}