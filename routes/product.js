const express = require("express");
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middleware/authentication");
const { validateProduct } = require("../middleware/validation");

const router = express.Router();

router.post("/", authentication, isAdmin, validateProduct, ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.put("/:id", authentication, isAdmin, validateProduct, ProductController.update);
router.delete("/:id", authentication, isAdmin, ProductController.delete);

module.exports = router;

