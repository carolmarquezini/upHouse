const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const authController = require("../controllers/authController")

const { checkAuth } = require("../middlewares/auth")


router.get("/all", userController.getAll)
router.get("/filterProblem", userController.getProblem)
router.post("/create", userController.createUser)
router.post('/login', authController.login)
router.patch("/update/:id", userController.updateUserById)
router.delete("/delete/:id", checkAuth, userController.deleteUserById)


module.exports = router