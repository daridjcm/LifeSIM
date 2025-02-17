const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

let users = [];
let customers = [];
let groceryList = [];

// Ruta POST para guardar productos en la lista de compras
app.post("/grocery", (req, res) => {
  console.log("Cuerpo recibido:", req.body);

  const { selectedItems: receivedRes } = req.body;

  if (!Array.isArray(receivedRes)) {
    console.error("Error: selectedItems not is an array");
    return res.status(400).json({ error: "The products received not is valid." });
  }

  // Guardar los productos recibidos en groceryList
  groceryList.push(...receivedRes);
  console.log("Products saved:", groceryList);

  return res.json({
    message: "Products saved correctly.",
    groceryList: groceryList,
  });
});

app.get("/grocery", (req, res) => {
  res.send({ groceryList });
});

// Ruta para agregar clientes
app.post("/customers", (req, res) => {
  const { name, phone, status, date } = req.body;
  const client = { name, phone, status, date };
  customers.push(client);
  res.send({ customers });
});

// Ruta para agregar usuarios
app.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  const user = { username, email, password };
  users.push(user);
  res.send({ users });
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send({ users, customers, groceryList });
  console.log("Server running...");
});

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
