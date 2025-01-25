const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [];
const userIndex = users.findIndex((user) => user.id === id);
const { id, name } = req.body;

app.delete("/deleteUser", (req, res) => {
  userIndex === -1 ? res.status(404).send("User not found") 
  : res.send({ users: users.splice(userIndex, 1) && users });
})

app.update("/updateUser", (req, res) => {
  userIndex === -1 ? res.status(404).send("User not found") 
  : res.send({ users: users[userIndex].name = name && users });
});

app.post("/addUser", (req, res) => {
	const user = req.body;
	users.push(user);

	res.send({ users: users });
});

app.get("/getUsers", (req, res) => {
	res.send({ users: users });
});

// una ruta de tipo GET para obtener cosas
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
