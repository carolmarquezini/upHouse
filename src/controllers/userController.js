const UserSchema = require("../model/userSchema")
const bcrypt = require("bcrypt")


const getAll = async (request, response) => {
  UserSchema.find(function (err, users) {
    if (err) {
      return response.status(500).send({
        message: err.message
      })
    }
    return response.status(200).json(users)
  })
}

const getProblem = async (request, response) => {
  const problem = request.get("problema")
  const resultProblem = problem.split(" ")[1]

  if (!resultProblem) {
    return response.status(401).send("Erro no header")
  }

  try {
    const userFound = await UserSchema.findById(request.params.id)

    await userFound.get()

    return response.status(200).json({
      mensagem: `Problema  da(o)'${userFound.name}' encontrado com sucesso!`
    })

  } catch (err) {
    return response.status(400).json({
      mensagem: err.message
    })
  }
  

}

const createUser = async (request, response) => {
  const hashedPassword = bcrypt.hashSync(request.body.password, 10)
  request.body.password = hashedPassword

  const emailExists = await UserSchema.exists({ email: request.body.email })

  if (emailExists) {
    response.status(401).send({
      "message": "Email já cadastrado"
    })
  }

  try {
    const newUser = new UserSchema(request.body)

    if (newUser.name === "" || newUser.email === "" || newUser.telephone === "" || newUser.problem === "" || newUser.password === "") {
      return response.status(400).send({
        "message": "Todos os campos devem ser preenchidos"
      })
    }

    const savedUser = await newUser.save()

    response.status(201).send({
      "message": "Usuário criado com sucesso",
      savedUser
    });
  } catch (e) {
    console.error(e);
    response.status(500).json({
      message: e.message
    })
  }
}

const updateUserById = async (request, response) => {
  try {
    const findUser = await UserSchema.findById(request.params.id)

    if (findUser) {
      findUser.name = request.body.name || findUser.name
      findUser.email = request.body.email || findUser.email
      findUser.telephone = request.body.telephone || findUser.telephone
      findUser.problem = request.body.problem || findUser.problem
      findUser.password = request.body.password || findUser.password
    }

    const savedUser = await findUser.save()

    return response.status(200).send({
      message: "Usuário atualizada com sucesso!",
      savedUser
    })

  } catch (error) {
    console.error(error)
  }
}

const deleteUserById = async (request, response) => {
  try {
    const userFound = await UserSchema.findById(request.params.id)

    await userFound.delete()

    return response.status(200).json({
      mensagem: `Usuário '${userFound.name}' deletada com sucesso!`
    })

  } catch (err) {
    return response.status(400).json({
      mensagem: err.message
    })
  }
}


module.exports = {
  getAll,
  getProblem,
  createUser,
  updateUserById,
  deleteUserById
}