const axios = require("axios")
const config = require("../config.json")
const { User } = require("../models/user")

const getPlaylists = (req) => {
    return axios.get(`${config.spotify.api}/v1/me/playlists`, {
        headers: {
            "Authorization": `Bearer ${req.spotify_token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            console.info(`controllers/streams/getplaylists - `, response.data)
            const ps = response.data.items.map(item => {
                return {
                    name: item.name,
                    sid: item.id
                }
            })
            return User.findOneAndUpdate({ user_email: req.user_email },
                { $set: { playlists: ps } },
                { new: true, projection: "user_name user_email playlists" }
            )
        })
        .then(doc => {
            if (!doc) throw Error('document is null')
            return doc
        })

}

module.exports = {
    getPlaylists
}