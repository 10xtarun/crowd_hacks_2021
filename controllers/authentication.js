const { default: axios } = require("axios")
const { User } = require("../models/user")
const config = require("../config.json")
const querystring = require("querystring")

const getRefreshToken = (req, res, next) => {
    return User.findOne({ user_email: req.user_email })
        .then(doc => {
            const data = {
                grant_type: 'refresh_token',
                refresh_token: doc.refresh_token,
                client_id: process.env.SPOITFY_CLIENT_ID,
                client_secret: process.env.SPOITFY_CLIENT_SECRET
            }
            return axios.post(`${config.spotify.url}/api/token`, querystring.stringify(data), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                }
            })
        })
        .then(response => {
            return User.findOneAndUpdate(
                { user_email: req.user_email },
                { $set: { access_token: response.data.access_token } },
            )
        })
        .then(doc => {
            if (!doc) throw Error(`document not found in DB - ${req.user_email}`)
            return true
        })
        .catch(err => {
            if (err) console.log(`controller - refresh token - failed -${err}`)
            return false
        })
}

module.exports = {
    getRefreshToken
}