const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [];
const customers = [];

// Ruta para agregar, editar y eliminar clientes
app.all("/customers", (req, res) => {
  const { name, phone, status, date} = req.body;
  const client = { name, phone, status, date };
  customers.push(client);
  res.send({ customers });
});

// Ruta para agregar, editar y eliminar usuarios
app.all("/users", (req, res) => {
  const { username, email, password } = req.body;
  const user = { username, email, password };
  users.push(user);
  res.send({ users });
});

// Ruta raiz
app.get("/", (req, res) => {
  // Obtiene los datos de los clientes y los usuarios
  res.send({ users, customers });
  console.log('Server running...');
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
