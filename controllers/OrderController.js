const { Order, User, Sequelize } = require("../models/index.js");
const { Op } = Sequelize;

const OrderController = {
    async create(req, res) {
        try {
            req.body.UserId = req.user.id; // vincula al usuario logueado
            const order = await Order.create(req.body);
            res.status(201).send({ msg: "Pedido creado con éxito", order });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error al crear el pedido", error });
        }
    },

    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [{ model: User, attributes: ["name", "email"] }]
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
                include: [User]
            });
            res.status(200).send(order);
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el pedido' });
        }
    },

    async getOneByName(req, res) {
        try {
            const order = await Order.findOne({
                where: {
                    title: {
                        [Op.like]: `%${req.params.title}%`
                    }
                },
                include: [User]
            });
            res.status(200).send(order);
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el pedido' });
        }
    },

    async delete(req, res) {
        try {
            await Order.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send('El pedido ha sido eliminado con éxito');
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el pedido' });
        }
    },
};

module.exports = OrderController;
