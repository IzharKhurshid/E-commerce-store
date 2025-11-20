const mongoose = require('mongoose')

const mongo = async (req, res) =>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("database is connected succesfully");
        
    } catch (error) {
        res.status(500).json({
            ERROR:error.stack,
            ERROR_DESCRIPTION:"FAILED TO CONNECT TO DATBASE"
        })
    }
}


module.exports = mongo;