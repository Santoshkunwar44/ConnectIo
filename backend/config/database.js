const mongoose = require("mongoose")
const connectToMongo = async (app) => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // app.listen(8080, console.log("server started"))
        console.log(`connected to mongo ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)

    }



}
module.exports = connectToMongo