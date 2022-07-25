const UserSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const login = (request, response) => {
    try {
        UserSchema.findOne({ email: request.body.email }, (error, user) => {
            console.log("USUÁRIO", user)
            if (!user) {
                return response.status(401).send({
                    message: "User não encontrado",
                    email: `${request.body.email}`
                })
            }

            const validPassword = bcrypt.compareSync(request.body.password, user.password);
            console.log("A SENHA É VÁLIDA?", validPassword)

            if (!validPassword) {
                return response.status(401).send({
                    "message": "Senha incorreta",
                    "statusCode": 401
                })
            }

            const token = jwt.sign({ name: user.name }, SECRET);
            console.log("TOKEN CRIADO:", token);

            response.status(200).send({
                "message": "Login autorizado",
                token
            });
        })
    } catch (err) {
        console.error(err)
    }
};

module.exports = {
    login
};