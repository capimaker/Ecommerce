const { Order, User, Product, OrderProduct, Sequelize, sequelize } = require("../models");
const { Op } = Sequelize;

const OrderController = {
  async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const { products, ...orderData } = req.body;
      orderData.user_id = req.user.id;

      const order = await Order.create(orderData, { transaction: t });

      for (const item of products) {
        await OrderProduct.create({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity
        }, { transaction: t });
      }

      await t.commit();
      res.status(201).send({ msg: "Pedido creado con éxito", order });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).send({ msg: "Error al crear el pedido", error });
    }
  },

  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          { model: User, attributes: ["name", "email"] },
          { model: Product }
        ]
      });
      res.status(200).send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha habido un problema al cargar los pedidos' });
    }
  },

  async getById(req, res) {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["name", "email"] },
          { model: Product }
        ]
      });
      if (!order) return res.status(404).send({ message: "Pedido no encontrado" });
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send({ message: 'Ha habido un problema al cargar el pedido' });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Order.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) return res.status(404).send({ message: "Pedido no encontrado" });
      res.send('El pedido ha sido eliminado con éxito');
    } catch (error) {
      res.status(500).send({ message: 'Error al eliminar el pedido' });
    }
  },
};

module.exports = OrderController;
