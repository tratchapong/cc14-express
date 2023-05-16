const express = require('express')
const {getAllProducts, getProductById, createProduct} = require('../controllers/productController')
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
// Homework

// 1. ลบตาม id ที่ระบุ
router.delete('/:id', ()=>{})  // req.params
// 2. update ข้อมูลตาม id ที่ระบุ
router.put('/:id', ()=>{})  // req.params + req.body
// 3. ค้นหา products จากบางส่วนของชื่อ
router.get('/search', ()=>{})  //req.query
        //  /products?name="Complete"

module.exports = router