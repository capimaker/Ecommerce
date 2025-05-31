const express = require("express");
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middleware/authentication");

const router = express.Router();

router.post("/", authentication, isAdmin, ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", authentication, isAdmin, ProductController.update);
router.delete("/:id", authentication, isAdmin, ProductController.delete);

module.exports = router;
