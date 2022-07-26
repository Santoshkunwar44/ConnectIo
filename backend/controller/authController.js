const User = require("../model/User")
const bcrypt = require("bcrypt")
const token = require("jsonwebtoken")
const registerUser = async (req, res) => {


    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(401).json({ message: "This email is already registerd ", success: false })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
        const newUser = new User(req.body)
        const savedUser = await newUser.save()



        const tokens = token.sign({
            username: savedUser.username, id: savedUser._id
        }, process.env.JWT_SECRET, { expiresIn: "1h" })
        savedUser.token = tokens;
        let newObj = { ...savedUser._doc, token: tokens }

        res.status(200).json({ message: newObj, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error, success: false })

    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {

        const savedUser = await User.findOne({ email })
        if (savedUser) {
            const validity = await bcrypt.compare(password, savedUser.password)
            if (!validity) {
                res.status(401).json({ message: "username or password is invalid", success: true })
            } else {

                const tokens = token.sign({
                    username: savedUser.username, id: savedUser._id
                }, process.env.JWT_SECRET, { expiresIn: "1h" })
                savedUser.token = tokens;
                let newObj = { ...savedUser._doc, token: tokens }

                return res.status(200).json({ message: newObj, success: true })


            }


        } else {
            res.status(404).json({ message: "This email is not found", success: false })
        }
    } catch (err) {
    }

}


module.exports = { registerUser, loginUser }