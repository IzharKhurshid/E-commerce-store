import mongoose from "mongoose";
import product from "../models/product_model.js";

class product_service {
    constructor() {
        console.log("FILE : Product_service | constructor | service initialized")
    }

    async create_product({ product_owner, product_name, product_description, product_price, product_image, product_category, product_quantity }) {

        let operation_response = { STATUS: '', MESSAGE: '', ERROR_DESCRIPTION: '', DB_DATA: {} }

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
            console.log("FILE : Product_service:53 | create_product | error while creating product", error.stack)

            operation_response.STATUS = "ERROR";
            operation_response.ERROR_DESCRIPTION = error.message || "Error while creating the product";
            return operation_response;

        }
    }


    async update_product(product_id, { product_name, product_description, product_price, product_image, product_quantity, product_rating, product_reviews }) {

        let operation_response = { STATUS: '', MESSAGE: '', ERROR_DESCRIPTION: '', DB_DATA: {} }

        try {

            if (!product_id) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product ID is required";
                return operation_response;
            }


            if (!product_name || !product_description || !product_price || !product_image || product_quantity === undefined) {
                console.log("FILE : Product_service | update_product | product details are required")
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


            const update_data = {
                product_name,
                product_description,
                product_price,
                product_image,
                product_quantity,
                product_reviews,
                product_rating
            }

            // console.log("###", update_data)
            const update_product = await product.findByIdAndUpdate(product_id, update_data, { new: true })

            // console.log("update_product", update_product)

            if (!update_product) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product not found with the given ID";
                return operation_response;
            }

            operation_response.STATUS = "Successfull";
            operation_response.MESSAGE = "product updated succesfully";
            operation_response.DB_DATA = update_product

            return operation_response;

        } catch (error) {
            console.log("FILE : Product_service:132 | update_product | error while updating product", error.stack)

            operation_response.STATUS = "ERROR";
            operation_response.ERROR_DESCRIPTION = error.message || "Error while updating the product";
            return operation_response;
        }


    }


    async delete_product(product_id) {
        let operation_response = { STATUS: '', MESSAGE: '', ERROR_DESCRIPTION: '', DB_DATA: {} }

        try {
            if (!product_id) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product ID is required";
                return operation_response;
            }

            const delete_product = await product.findByIdAndDelete(product_id)

            console.log("delete", delete_product)
            if (!delete_product) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product not found with the given ID";
                return operation_response;
            }

            operation_response.STATUS = "Successfull";
            operation_response.MESSAGE = "product deleted succesfully";
            operation_response.DB_DATA = delete_product

            return operation_response
        } catch (error) {
            console.log("FILE : Product_service:132 | delete_product | error while deleting product", error.stack)

            operation_response.STATUS = "ERROR";
            operation_response.ERROR_DESCRIPTION = error.message || "Error while deleting the product";
            return operation_response;
        }
    }


    async get_products(page = 1, limit = 20) {
        let operation_response = { STATUS: '', MESSAGE: '', ERROR_DESCRIPTION: '', DB_DATA: {} }

        try {


            const page_number = parseInt(page)
            const page_limit = parseInt(limit)

            if (page_number < 1) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Page number must be greater than 0";
                return operation_response;
            }

            if (page_limit < 1 || limitNumber > 100) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Limit must be between 1 and 100";
                return operation_response;
            }


            const skip = (page_number - 1) * page_limit;
            const totalProducts = await product.countDocuments();

            const get_products = await product.find()
                .skip(skip)
                .limit(limitNumber)
                .sort({ createdAt: -1 });


            const totalPages = Math.ceil(totalProducts / limitNumber);
            const hasNextPage = pageNumber < totalPages;
            const hasPreviousPage = pageNumber > 1;

            if (!get_products) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product not found with the given ID";
                return operation_response;
            }

            operation_response.STATUS = "Successfull";
            operation_response.MESSAGE = "products fetched succesfully";
            operation_response.DB_DATA = {
                product:get_products,
                pagination: {
                    currentPage: pageNumber,
                    totalPages: totalPages,
                    totalProducts: totalProducts,
                    limit: limitNumber,
                    hasNextPage: hasNextPage,
                    hasPreviousPage: hasPreviousPage
                }
            }


            return operation_response;

        } catch (error) {
            console.log("FILE : Product_service:132 | get_products | error while getting products", error.stack)

            operation_response.STATUS = "ERROR";
            operation_response.ERROR_DESCRIPTION = error.message || "Error while getting the products";
            return operation_response;
        }
    }


    async get_product_by_id(product_id) {
        let operation_response = { STATUS: '', MESSAGE: '', ERROR_DESCRIPTION: '', DB_DATA: {} }
        try {
            if (!product_id) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product ID is required";
                return operation_response;
            }

            const get_product = await product.findById(product_id)

            if (!get_product) {
                operation_response.STATUS = "ERROR";
                operation_response.ERROR_DESCRIPTION = "Product not found with the given ID";
                return operation_response;
            }

            operation_response.STATUS = "Successfull";
            operation_response.MESSAGE = "product fetched succesfully";
            operation_response.DB_DATA = get_product

            return operation_response;
        } catch (error) {
            console.log("FILE : Product_service:221 | get_product_by_id | error while getting product", error.stack)

            operation_response.STATUS = "ERROR";
            operation_response.ERROR_DESCRIPTION = error.message || "Error while getting the product";
            return operation_response;
        }
    }
}


export default product_service;