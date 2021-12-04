const express = require('express')
const cors = require("cors")
const { greetingsRouter } = require('./routes/greetings')

// app setup
const app = express()

// middleware setup
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("", greetingsRouter)

module.exports = {
    app
}