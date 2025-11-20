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
            ERROR_DESCRIPTION: 'Failed to enroll user to application'
        };
        try {
            const { product_owner, product_name, product_description, product_price, product_image, product_category, product_quantity } = req.body

            const result = await this.productService.create_product(
                product_owner,
                product_name,
                product_description,
                product_price,
                product_image,
                product_category,
                product_quantity
            )

            if (result.STATUS === 'ERROR') {

                operation_response.ERROR_FILTER = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Failed to create the product. Please try again!!"
                return res.status(400).json(operation_response)
            }

            return res.status(201).json({
                MESAGE: "Product creation successfull",
                DB_DATA: result
            })


        } catch (error) {
            console.log("FILE : Product_controller | create_product | error", error.stack);

            operation_response.STATUS = "ERROR"
            operation_response.ERROR_DESCRIPTION = "Internal server error"

            return res.status(500).json(operation_response);
        }
    }


}



export default Product_controller;