import express from 'express';
import Product_controller from '../controllers/product_controller.js';

const productController = new Product_controller()
const router = express.Router()


router.post("/create_product", productController.create_product.bind(productController))
router.put("/update_product/:id", productController.update_product.bind(productController))
router.delete("/delete_product/:id", productController.delete_product.bind(productController))
router.get("/get_products", productController.get_products.bind(productController))
router.get("/get_specific_product/:id", productController.get_product_by_id.bind(productController))


export default router;