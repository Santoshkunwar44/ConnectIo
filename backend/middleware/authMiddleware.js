const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

const authMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            console.log("inside the token")
            next()
        }
    } catch (error) {

        res.status(401).json({ message: "You are not authorized" })
        // next()

    }

}
module.exports = authMiddleware