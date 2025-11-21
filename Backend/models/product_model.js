import mongoose from "mongoose";

const product_schema = new mongoose.Schema({
    product_owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    product_name: { type: String, required: true },
    product_description: { type: String, },
    product_price: { type: Number, required: true },
    product_image: { type: String, },
    product_category: { type: String, required: true },
    product_quantity: { type: Number, required: true },
    product_rating: { type: Number, },
    product_reviews: { type: Number },

})

export default mongoose.model("product", product_schema);