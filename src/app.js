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
        title: "Reprograma -> TEMA: Construção civil voltada ao público de baixa renda. - Projeto Final: upHouse",
        version: "1.0.0",
        mensagem: "Construção civil voltada ao público de baixa renda."
        })
} )

app.use("/users", userRoutes)
app.use("/upHouse",upHouseRoutes)

module.exports = app