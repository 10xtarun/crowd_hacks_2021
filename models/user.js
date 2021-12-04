const mongoose = require("mongoose")

const playlistSchema = mongoose.Schema({
    sid: String,
    name: String
})

const schema = mongoose.Schema({
    user_id: String,
    user_name: String,
    user_email: String,
    access_token: String,
    refresh_token: String,
    token_type: String,
    scope: String,
    playlists: [playlistSchema]
})

const User = mongoose.model("user", schema)
module.exports = {
    User
}