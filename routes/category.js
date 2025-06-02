const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { authentication, isAdmin } = require("../middleware/authentication");

const router = express.Router();


router.post("/", authentication, isAdmin, CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.get("/search/name/:name", CategoryController.searchByName);
router.put("/:id", authentication, isAdmin, CategoryController.update);
router.delete("/:id", authentication, isAdmin, CategoryController.delete);

module.exports = router;
