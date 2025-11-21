import product_service from "../service/product_service.js";


class Product_controller {
    constructor() {
        console.log("FILE : Product_service | constructor | controller initialized")

        this.productService = new product_service()
    }

    async create_product(req, res) {
        let operation_response = {
            STATUS: 'ERROR',
            ERROR_FILTER: 'TECHNICAL_ISSUE',
            ERROR_DESCRIPTION: 'Failed to create Product'
        };
        try {
            const { product_owner, product_name, product_description, product_price, product_image, product_category, product_quantity } = req.body

            const result = await this.productService.create_product({
                product_owner,
                product_name,
                product_description,
                product_price,
                product_image,
                product_category,
                product_quantity
            })

            if (result.STATUS === 'ERROR') {

                operation_response.ERROR_FILTER = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Failed to create the product. Please try again!!"
                return res.status(400).json(operation_response)
            }

            return res.status(200).json({
                DB_DATA: result
            })


        } catch (error) {
            console.log("FILE : Product_controller | create_product | error", error.stack);

            operation_response.STATUS = "ERROR"
            operation_response.ERROR_DESCRIPTION = "Internal server error"

            return res.status(500).json(operation_response);
        }
    }


    async update_product(req, res) {

        let operation_response = {
            STATUS: 'ERROR',
            ERROR_FILTER: 'TECHNICAL_ISSUE',
            ERROR_DESCRIPTION: 'Failed to update Product'
        };

        try {

            const product_id = req.params.id

            const {
                product_name,
                product_description,
                product_price,
                product_image,
                product_quantity,
                product_reviews,
                product_rating
            } = req.body


            const result = await this.productService.update_product(product_id, {
                product_name,
                product_description,
                product_price,
                product_image,
                product_quantity,
                product_reviews,
                product_rating
            })

            // console.log("inside controller", result)

            if (result.STATUS === 'ERROR') {

                operation_response.ERROR_FILTER = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Failed to update the product. Please try again!!"
                return res.status(400).json(operation_response)
            }

            return res.status(200).json({
                DB_DATA: result
            })


        } catch (error) {
            console.log("FILE : Product_controller | update_product | error", error.stack);

            operation_response.STATUS = "ERROR"
            operation_response.ERROR_DESCRIPTION = "Internal server error"

            return res.status(500).json(operation_response);
        }
    }


    async delete_product(req, res) {

        let operation_response = {
            STATUS: 'ERROR',
            ERROR_FILTER: 'TECHNICAL_ISSUE',
            ERROR_DESCRIPTION: 'Failed to delete Product'
        };

        try {
            const product_id = req.params.id

            const result = await this.productService.delete_product(product_id)

            if (result.STATUS === 'ERROR') {

                operation_response.ERROR_FILTER = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Failed to update the product. Please try again!!"
                return res.status(400).json(operation_response)
            }

            return res.status(200).json({
                DB_DATA: result
            })
        } catch (error) {
            console.log("FILE : Product_controller | delete_product | error", error.stack);

            operation_response.STATUS = "ERROR"
            operation_response.ERROR_DESCRIPTION = "Internal server error"

            return res.status(500).json(operation_response);
        }

    }


    async get_products(req, res) {

        let operation_response = {
            STATUS: 'ERROR',
            ERROR_FILTER: 'TECHNICAL_ISSUE',
            ERROR_DESCRIPTION: 'Failed to get Product'
        };

        try {

            const page = req.query.page || 1;
            const limit = req.query.limit || 20;

            const result = await this.productService.get_products(page, limit)

            if (result.STATUS === 'ERROR') {

                operation_response.ERROR_FILTER = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Failed to get products. Please try again!!"
                return res.status(400).json(operation_response)
            }

            return res.status(200).json({
                DB_DATA: result
            })

        } catch (error) {
            console.log("FILE : Product_controller | get_products | error", error.stack);

            operation_response.STATUS = "ERROR"
            operation_response.ERROR_DESCRIPTION = "Internal server error"

            return res.status(500).json(operation_response);
        }


    }

    async get_product_by_id(req, res) {

        let operation_response = {
            STATUS: 'ERROR',
            ERROR_FILTER: 'TECHNICAL_ISSUE',
            ERROR_DESCRIPTION: 'Failed to get Product'
        };

        try {

            const product_id = req.params.id
            const result = await this.productService.get_product_by_id(product_id)

            if (result.STATUS === 'ERROR') {

                operation_response.ERROR_FILTER = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Failed to get the product. Please try again!!"
                return res.status(400).json(operation_response)
            }

            return res.status(200).json({
                DB_DATA: result
            })

        } catch (error) {
            console.log("FILE : Product_controller | get_product_by_id | error", error.stack);

            operation_response.STATUS = "ERROR"
            operation_response.ERROR_DESCRIPTION = "Internal server error"

            return res.status(500).json(operation_response);
        }


    }



}



export default Product_controller;