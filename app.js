const express = require('express')
const cors = require("cors")
const { connectDB } = require('./configs/db')
const { greetingsRouter } = require('./routes/greetings')
const { authRouter } = require('./routes/authentication')


// app setup
const app = express()

// db setup
connectDB()

// middleware setup
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("", greetingsRouter)
app.use("/auth", authRouter)

module.exports = {
    app
}