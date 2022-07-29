const express = require("express")
const router = express.Router()

const upHouseController = require("../controllers/upHouseController")
const { checkAuth } = require("../middlewares/auth")


router.get("/all", upHouseController.getAll)
router.get("/category", upHouseController.getByCategory)
router.post("/create", upHouseController.createUpHouse)
router.patch("/update/:id", upHouseController.updateUpHouseById)
router.delete("/delete/:id", checkAuth,upHouseController.deleteCategoryById), 

module.exports = router 