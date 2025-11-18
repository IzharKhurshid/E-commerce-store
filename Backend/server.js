require("dotenv").config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

const PORT = process.env.PORT || 8880;

app.listen(PORT, () =>{
    console.log("server is running on PORT : ", PORT);
    
})