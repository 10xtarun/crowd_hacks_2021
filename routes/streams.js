const { getRefreshToken } = require("../controllers/authentication")
const { getPlaylists } = require("../controllers/streams")

const streamsRouter = require("express").Router()

streamsRouter.get("/playlists", (req, res, next) => {
    return getPlaylists(req)
        .then(doc => {
            return res.status(200).json({
                success: true,
                data: doc
            })
        })
        .catch(err => {
            console.error("routes/streams/getplaylists -", err.toString())

            if (err.toString() == "Error: Request failed with status code 401") {
                getRefreshToken(req, res, next)
                return res.status(400).json({
                    success: false,
                    error: err.toString(),
                    message: 'spotify access failure, refresh after few seconds'
                })
            }

            return res.status(400).json({
                success: false,
                error: err.toString(),
                message: 'spotify playlist fetch failed'
            })
        })
})

module.exports = {
    streamsRouter
}