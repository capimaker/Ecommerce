# Ecommerce
# 🏎️ API REST - Ecommerce de Coches de Lujo

Este proyecto es una API REST construida con **Node.js**, **Express**, **Sequelize** y **MySQL** que permite la gestión de usuarios, productos (coches de lujo), categorías y pedidos.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Sequelize ORM
- MySQL
- Bcrypt
- JSON Web Tokens (JWT)
- Nodemailer

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ecommerce-coches-lujo.git
   cd ecommerce-coches-lujo

2. Instala dependencias
   npm install

3. Configura la base de datos:
 Edita el archivo config/config.json con tus credenciales de MySQL.

4. Crea la base de datos y ejecuta las migraciones:
 
  npx sequelize db:create
  npx sequelize db:migrate
  npx sequelize db:seed:all

5. Inicia el servidor:
  npm run dev

📦 Endpoints

🔐 Usuarios
POST /users → Registro con validación y confirmación por email
POST /users/login → Login con JWT
GET /users/confirm/:emailToken → Confirmar cuenta
GET /users/profile → Ver usuario logueado con sus pedidos y productos
PUT /users/id/:id → Actualizar usuario
DELETE /users/logout → Logout
DELETE /users/id/:id → Eliminar usuario (admin)

🛒 Productos
GET /products → Ver todos los productos con sus categorías
GET /products/:id → Ver producto por ID
POST /products → Crear producto (autenticado + admin)
PUT /products/:id → Actualizar producto (admin)
DELETE /products/:id → Eliminar producto (admin)
Filtros:
/products?name=Ferrari
/products?price=100000
/products?order=desc (ordenar por precio)

🏷️ Categorías
GET /categories → Ver todas con productos
GET /categories/:id → Ver una categoría por ID
GET /categories/search/name/:name → Buscar por nombre
POST /categories → Crear categoría (admin)
PUT /categories/:id → Actualizar categoría (admin)
DELETE /categories/:id → Eliminar categoría (admin)

📦 Pedidos
GET /orders → Ver todos los pedidos (admin o usuario logueado)
GET /orders/:id → Ver pedido por ID
POST /orders → Crear pedido

🔐 Seguridad

Las rutas protegidas requieren token de autenticación (Bearer <token>).
Los tokens se generan al iniciar sesión.
Hay roles de usuario (user, admin).
✅ Validaciones implementadas

Registro de usuario: nombre, apellido, email, contraseña, teléfono.
Creación de producto: nombre, precio, sin decimales.
Autenticación y roles para crear/editar/borrar productos o categorías.
🌱 Seeders

5 productos de coches de lujo
4 categorías
Relación de productos y categorías
Un usuario administrador y uno normal
Pedidos de ejemplo
📩 Email de Confirmación

El registro envía un email de confirmación con un token. Hasta confirmar, el usuario no puede iniciar sesión.

📌 Autor

Proyecto realizado por Carlos (capimaker) como entrega del módulo de Backend en The Bridge.