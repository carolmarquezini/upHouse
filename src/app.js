const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv-safe").config()

const db = require("./config/database")
const userRoutes = require("./routes/userRoutes")
const upHouseRoutes = require("./routes/upHouseRoutes")

db.connect()

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.status(200).send({
        title: "Reprograma -> TEMA - Projeto Final",
        version: "1.0.0",
        mensagem: "BREVE DESCRIÇÃO DO TEMA"
        })
} )

app.use("/users", userRoutes)
app.use("/upHouse",upHouseRoutes)

module.exports = app