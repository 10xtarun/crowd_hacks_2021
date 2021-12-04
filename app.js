const express = require('express')
const cors = require("cors")
const { greetingsRouter } = require('./routes/greetings')
const { connectDB } = require('./configs/db')

// app setup
const app = express()

// db setup
connectDB()

// middleware setup
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("", greetingsRouter)

module.exports = {
    app
}