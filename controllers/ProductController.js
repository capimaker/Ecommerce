const { Product, Category, Sequelize } = require("../models");
const { Op } = Sequelize;

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send({ msg: "Producto creado con éxito", product });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error al crear el producto", error });
    }
  },

  async getAll(req, res) {
    try {
      const { name, price, sort } = req.query;

      const where = {};
      const order = [];

      if (name) {
        where.name_product = { [Op.like]: `%${name}%` };
      }

      if (price) {
        where.price = price;
      }

      if (sort === "desc" || sort === "asc") {
        order.push(["price", sort]);
      }

      const products = await Product.findAll({
        where,
        order,
        include: [Category],
      });

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ msg: "Error al obtener productos", error });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [Category],
      });
      if (!product) return res.status(404).send({ msg: "Producto no encontrado" });
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ msg: "Error al obtener producto", error });
    }
  },

  async update(req, res) {
    try {
      await Product.update(req.body, {
        where: { id: req.params.id }
      });
      res.send({ msg: "Producto actualizado con éxito" });
    } catch (error) {
      res.status(500).send({ msg: "Error al actualizar producto", error });
    }
  },

  async delete(req, res) {
    try {
      await Product.destroy({
        where: { id: req.params.id }
      });
      res.send({ msg: "Producto eliminado con éxito" });
    } catch (error) {
      res.status(500).send({ msg: "Error al eliminar producto", error });
    }
  },
};

module.exports = ProductController;
