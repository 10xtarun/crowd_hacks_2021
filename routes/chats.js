const chatRouter = require("express").Router()
const { User } = require("../models/user")

chatRouter.get('/generate', (req, res, next) => {
    return User.find({}, { user_name: 1, user_email: 1, audio_features: 1 })
        .limit(20)
        .then(docs => {
            const self = docs.splice(docs.findIndex(user => user.user_email == req.user_email), 1)
            const others = docs
            return res.status(200).json({
                success: true,
                others,
                self
            })
        })
})

module.exports = {
    chatRouter
}