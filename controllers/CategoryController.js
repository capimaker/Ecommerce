const { Category, Product, Sequelize } = require("../models");
const { Op } = Sequelize;

const CategoryController = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).send({ message: "Categoría creada con éxito", category });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear la categoría", error });
    }
  },

  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        include: [Product],
      });
      res.status(200).send(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al obtener las categorías", error });
    }
  },

  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [Product],
      });
      if (!category) return res.status(404).send({ message: "Categoría no encontrada" });
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener la categoría", error });
    }
  },

  async searchByName(req, res) {
    try {
      const name = req.params.name;
      const categories = await Category.findAll({
        where: {
          name_category: {
            [Op.like]: `%${name}%`
          }
        },
        include: [Product]
      });
      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({ message: "Error al buscar la categoría", error });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Category.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).send({ message: "Categoría no encontrada" });
      res.send({ message: "Categoría actualizada con éxito" });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar la categoría", error });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Category.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) return res.status(404).send({ message: "Categoría no encontrada" });
      res.send({ message: "Categoría eliminada con éxito" });
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar la categoría", error });
    }
  }
};

module.exports = CategoryController;
