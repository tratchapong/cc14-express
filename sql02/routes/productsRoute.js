const express = require('express')
const {getAllProducts, getProductById, getProductByName, createProduct, deleteProducts,updateProducts } = require('../controllers/productController')
const router = express.Router()

router.get('/', getAllProducts)
router.get('/search', getProductByName)  //req.query
router.get('/:id', getProductById)
router.post('/', createProduct)
// Homework
router.delete('/:id', deleteProducts)  // req.params
router.put('/:id', updateProducts)  // req.params + req.body

// 3. ค้นหา products จากบางส่วนของชื่อ
        //  /products/search?name="Complete"

module.exports = router