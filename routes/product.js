const router = require('express').Router()
const productController = require ('../controller/product')
const auth = require ('../middleware/auth')
const cloudUpload = require ('../middleware/cloudinary')


router.post('/',auth,cloudUpload('photo'),productController.createProduct)
router.get('/',auth,productController.getProduct)
router.put('/:id',auth,cloudUpload('photo'),productController.updateProduct)
router.delete('/:id',auth,productController.deleteProduct)



module.exports = router