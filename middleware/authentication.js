const { User, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Token no proporcionado o inválido" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, jwt_secret); // id en el payload
    const user = await User.findByPk(payload.id);

    const tokenFound = await Token.findOne({
      where: {
        [Op.and]: [
          { UserId: user.id },
          { token: token }
        ]
      }
    });

    if (!tokenFound) {
      return res.status(401).send({ message: 'Token no autorizado' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, message: 'Ha habido un problema con el token' });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ['admin', 'superadmin'];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({ message: 'No tienes permisos' });
  }
  next();
};

module.exports = { authentication, isAdmin };
