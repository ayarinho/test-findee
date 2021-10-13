const authController = require("../controllers/auth.controller");
const router = require("express").Router();
const checkUser = require('../middelware/auth.middleware')

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);

router.get("/users" ,authController.getAllUsers);


module.exports = router;
