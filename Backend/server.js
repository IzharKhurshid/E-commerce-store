import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import helmet from "helmet"
import product_routes from './routes/product_route.js'

import mongo from "./configs/my_db.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use("/products/api", product_routes)

const PORT = process.env.PORT || 8880;



app.listen(PORT, () =>{
    mongo()
    console.log("server is running on PORT : ", PORT);
    
})