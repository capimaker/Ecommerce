const express = require("express");
const OrderController = require("../controllers/OrderController");
const { authentication } = require("../middleware/authentication");
const router = express.Router();

router.post("/", authentication, OrderController.create);
router.get("/", authentication, OrderController.getAll);
router.get("/:id", authentication, OrderController.getById);
router.delete("/:id", authentication, OrderController.delete);

module.exports = router;

