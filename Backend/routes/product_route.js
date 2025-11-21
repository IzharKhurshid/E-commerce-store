import express from 'express';
import Product_controller from '../controllers/product_controller.js';

const productController = new Product_controller()
const router = express.Router()


router.post("/create_product", productController.create_product.bind(productController))


export default router;