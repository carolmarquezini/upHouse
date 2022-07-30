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

const getUserById = async (request, response) => {
  try {
    const findById = await UserSchema.findById(request.params.id)

    if(findById === null){
      return response.status(404).json({
        message: `Usuário não encontrado!`,
        user: findById
      })
    }

    return response.status(200).json({
      message: `Usuário ${findById.name} encontrado!`,
      user: findById
    })


  } catch (err) {
    console.error(err);
    response.status(500).json({
      message: err.message
    })
  }
}

const createUser = async (request, response) => {
  const hashedPassword = bcrypt.hashSync(request.body.password, 10)
  request.body.password = hashedPassword

  const emailExists = await UserSchema.exists({ email: request.body.email })

  if (emailExists) {
    response.status(401).send({
      "message": "E-mail já cadastrado!"
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
  } catch (err) {
    console.error(err);
    return response.status(500).json({
      message: err.message
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
      message: "Usuário atualizado com sucesso!",
      savedUser
    })

  } catch (error) {
    console.error(error)
  }
}


const deleteUserById = async (request, response) => {
  try {
    const userFind = await UserSchema.findById(request.params.id)

    await userFind.delete()

    return response.status(200).json({
      mensagem: `Usuário deletado com sucesso!`
    })

  } catch (err) {
    return response.status(400).json({
      mensagem: err.message
    })
  }
}

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}