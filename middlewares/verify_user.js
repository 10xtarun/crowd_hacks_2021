const jwt = require("jsonwebtoken")
const { User } = require("../models/user")

const verifyUser = (req, res, next) => {
    const decode = jwt.decode(req.headers.authorization, process.env.SECRET)
    console.log("----------------- ", decode)
    User.findOne({ user_email: decode.email_id })
        .then(doc => {
            if (!doc) return res.status(401).json({
                success: false,
                message: 'authentication failed - user not found'
            })
            req.user_email = doc.user_email
            next()
        })
}

module.exports = {
    verifyUser
}