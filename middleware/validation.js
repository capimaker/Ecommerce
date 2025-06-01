const validateProduct = (req, res, next) => {
  const { name_product, price } = req.body;

  if (!name_product || name_product.trim() === "") {
    return res.status(400).send({ message: "El nombre del producto es obligatorio" });
  }

  if (!price && price !== 0) {
    return res.status(400).send({ message: "El precio es obligatorio" });
  }

  if (!Number.isInteger(price)) {
    return res.status(400).send({ message: "El precio debe ser un número entero (sin decimales)" });
  }

  next();
};

module.exports = { validateProduct };

