import product from "../models/product_model.js";

class product_service {
    constructor() {
        console.log("FILE : Product_service | constructor | service initialized")
    }

    async create_product(product_owner, product_name, product_description, product_price, product_image, product_category, product_quantity) {

        const operation_response = { STATUS: '', MESSAGE: '', ERROR_DESCRIPTION: '', DB_DATA: {} }

        try {
            if (!product_name || !product_description || !product_price || !product_image || !product_category || !product_owner || product_quantity === undefined) {
                console.log("FILE : Product_service | create_product | product details are required")
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "All product fields are required";
                return operation_response;
            }


            if (typeof product_price !== 'number' || product_price <= 0) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product price must be a positive number";
                return operation_response;
            }

            if (typeof product_quantity !== 'number' || product_quantity < 0) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product quantity must be a non-negative number";
                return operation_response;
            }

            const new_product = new product({
                product_owner,
                product_name,
                product_description,
                product_price,
                product_image,
                product_category,
                product_quantity
            })


            await new_product.save()
            operation_response.STATUS = "Successfull";
            operation_response.MESSAGE = "product created succesfully";
            operation_response.DB_DATA = new_product

            return operation_response;

        } catch (error) {
            console.log("FILE : Product_service | create_product | error while create_product", error.stack)

            operation_response.STATUS = "ERROR";
            operation_response.ERROR_DESCRIPTION = error.message ||"Error while creating the product";
            return operation_response;

        }
    }

}


export default product_service;