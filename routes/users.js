const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication } = require("../middleware/authentication");
const { validateUser } = require("../middleware/validateUser");

const router = express.Router();


router.post("/", validateUser, UserController.create);
router.post("/login", UserController.login);
router.get('/confirm/:emailToken', UserController.confirm);
router.get("/", authentication, UserController.getAll);
router.get("/profile", authentication, UserController.getProfile);
router.put("/id/:id", authentication, UserController.update);
router.delete("/logout", authentication, UserController.logout);
router.delete("/id/:id", authentication, UserController.delete);

module.exports = router;



