const UpHouseSchema = require("../model/upHouseSchema")

const getAll = async (request, response) => {
  try {
    const upHouse = await UpHouseSchema.find().populate("user") 
    return response.status(200).json(upHouse)
       
  } catch (error) {
    return response.status(500).send({
      message: err.message
    })
}
}

const getByCategory = async (request, response) => {

  const category = {}

  for ([key,value] of Object.entries(request.query)) {
    category[key] = new Boolean (value).valueOf()
  }
  console.log(request.query, category)
    try {
        const categoryFound = await UpHouseSchema.find({
            category
        })
        console.log(`Categoorias ${categoryFound}`)
        
        return response.status(200).json({
            message: "Categoria localizada",
            categoryFound})

    } catch (err) {
        console.error(err);
        return response.status(500).json({
            message: err.message
        })
    }
}

const createUpHouse = async (request, response) => {

    try {
        const body = request.body

        if (body.userId === "" || body.category === "" || body.description === "") {
            return response.status(400).send({
                "message": "Todos os campos devem ser preenchidos"
            })
        }
        body.user = body.userId
        const newUpHouse = new UpHouseSchema(body)
        const savedUpHouse = await newUpHouse.save()

        response.status(201).send({
            "message": "Solicitação criada com sucesso",
            savedUpHouse: savedUpHouse
        });
    } catch (err) {
        console.error(err);
        response.status(500).json({
            message: err.message
        })
    }
}

const updateUpHouseById = async (request, response) => {
    try {
      const findUpHouse = await UpHouseSchema.findById(request.params.id)
  
      if (findUpHouse) {
        findUpHouse.user = request.body.userId || findUpHouse.user
        findUpHouse.category = request.body.category || findUpHouse.category
        findUpHouse.description = request.body.description || findUpHouse.description
        
      }
  
      const savedUpHouse = await findUpHouse.save()
  
      return response.status(200).send({
        message: `Solicitação com id: ${findUpHouse._id} e categoria ${findUpHouse.category} atualizada com sucesso!`,
        savedUpHouse: savedUpHouse
      })
  
    } catch (error) {
      console.error(error)
    }
  }
  
const deleteCategoryById = async (request, response) => {
    try {
      const userFind = await UpHouseSchema.findById(request.params.id)
  
      await userFind.delete()
  
      return response.status(200).json({
        mensagem: `Solicitação do(a) usiária(o) '${userFind.name}' deletada com sucesso!`
      })
  
    } catch (err) {
      return response.status(400).json({
        mensagem: err.message
      })
    }
  }

module.exports = {
    getAll,
    getByCategory,
    createUpHouse,
    updateUpHouseById,
    deleteCategoryById
}