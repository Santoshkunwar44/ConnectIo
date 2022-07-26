const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const morgan = require("morgan")
require("dotenv").config({ path: "./config/secret.env" })
require("./config/database")(app)
const cors = require("cors")


app.use(cors({
    origin: "http://localhost:3000",
    methods: "POST,PUT,GET,DELETE"
}))

app.use(bodyParser.json({ extended: false }))
app.use(morgan("dev"))


// routes

app.use("/api/auth", require("./routes/auth"))
app.use("/api/user", require("./routes/user"))
app.use("/api/post", require("./routes/post"))
app.use("/api/chat", require("./routes/chat"))
app.use("/api/message", require("./routes/message"))



app.listen(8080, () => console.log("server started"))




