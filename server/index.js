const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [];

// Ruta para eliminar un usuario
app.delete("/deleteUser", (req, res) => {
	const { id } = req.body;
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex === -1) return res.status(404).send({ error: "User not found" });

	users.splice(userIndex, 1);
	res.send({ users });
});

// Ruta para actualizar un usuario
app.put("/updateUser", (req, res) => {
	const { id, name } = req.body;
	const userIndex = users.findIndex((user) => user.id === id);

	if (userIndex === -1) return res.status(404).send({ error: "User not found" });

	users[userIndex] = { id, name };
	res.send({ users });
});

// Ruta para agregar un usuario
app.post("/addUser", (req, res) => {
	users.push(req.body);
	res.send({ users });
});

// Ruta para obtener todos los usuarios
app.get("/getUsers", (req, res) => res.send({ users }));

// Ruta raíz
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App running at http://localhost:${port}`));
