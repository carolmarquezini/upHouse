const express = require("express")
const router = express.Router()

const upHouseController = require("../controllers/upHouseController")

router.get("/all", upHouseController.getAll)
router.get("/category", upHouseController.getByCategory)
router.post("/create", upHouseController.createUpHouse)
router.patch("/update/:id", upHouseController.updateUpHouseById)
router.delete("/delete/:id", upHouseController.deleteCategoryById), 

module.exports = router 