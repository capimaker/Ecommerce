const validateProduct = (req, res, next) => {
  const { name_product, price } = req.body;

  if (!name_product || typeof name_product !== 'string' || name_product.trim() === '') {
    return res.status(400).json({ message: 'El nombre del producto es obligatorio y debe ser un string válido' });
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'El precio es obligatorio y debe ser un número mayor que 0' });
  }

  next();
};

module.exports = { validateProduct };
