

const validateUser = (req, res, next) => {
  const { first_name, last_name, email, password, phone } = req.body;

  if (!first_name || first_name.trim() === "") {
    return res.status(400).send({ message: "El nombre es obligatorio" });
  }

  if (!last_name || last_name.trim() === "") {
    return res.status(400).send({ message: "El apellido es obligatorio" });
  }

  if (!email || email.trim() === "") {
    return res.status(400).send({ message: "El email es obligatorio" });
  }

  if (!password || password.length < 6) {
    return res.status(400).send({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  if (!phone || !Number.isInteger(phone)) {
    return res.status(400).send({ message: "El teléfono debe ser un número entero" });
  }

  next();
};

module.exports = { validateUser };

