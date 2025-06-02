
const { User, Order, Product, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require('../config/nodemailer');
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  async create(req, res, next) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password,
        confirmed: false,
        role: "user"
      });

      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' });
      const url = `http://localhost:3000/users/confirm/${emailToken}`;

      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3> Bienvenido, estás a un paso de registrarte </h3>
               <a href="${url}"> Haz click en el enlace para confirmar tu registro</a>`
      });

      res.status(201).send({
        message: "Te hemos enviado un correo para confirmar el registro",
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(400).send({ message: "Usuario o contraseña incorrectos" });
      }

      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu correo" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      await Token.create({ token, UserId: user.id });

      res.send({ message: `Bienvenid@ ${user.first_name}`, user, token });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).send({ msg: 'Todos los usuarios', users });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "first_name", "last_name", "email"],
        include: [
          {
            model: Order,
            include: [Product]
          }
        ]
      });

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      res.status(200).send({ message: "Perfil del usuario", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al obtener el perfil" });
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      await User.update({ confirmed: true }, { where: { email: payload.email } });
      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Token inválido o expirado" });
    }
  },

  async update(req, res) {
    try {
      await User.update(req.body, {
        where: { id: req.params.id }
      });
      res.send('Usuario actualizado con éxito');
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el usuario", error });
    }
  },

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization }
          ]
        }
      });
      res.send({ message: 'Desconectado con éxito' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Hubo un problema al tratar de desconectarte' });
    }
  },

  async delete(req, res) {
    try {
      await User.destroy({
        where: { id: req.params.id }
      });
      res.send('El usuario ha sido eliminado con éxito');
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar el usuario", error });
    }
  }
};

module.exports = UserController;
