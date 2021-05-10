const mongoose = require('mongoose')


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('MongoDB Connected.. ');
    } catch (error) {
        console.error(error.message)
        //exit process with failure
        process.exit(1)
    }
}

module.exports = dbConnection