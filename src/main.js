const express = require("express");
const app = express();

// Middleware para analizar solicitudes JSON
app.use(express.json());

//Simulamos la BD en memoria con una colección
const usuarios = [
  { id: 1, nombre: "cristoto.dev" },
  { id: 2, nombre: "paco" },
];

// Método Get para devolver todos los usuarios de la "BD"
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// Método Post para crear un usuario
app.post("/usuarios", (req, res) => {
  const nuevoUsuario = req.body;

  usuarios.push(nuevoUsuario);

  res.json(nuevoUsuario);
});

// Método DELETE para eliminar un usuario por id
app.delete("/usuarios/:id", (req, res) => {
  //Obtenemos el ID del usuario de la solicitud
  const id = parseInt(req.params.id);

  // Borramos el usuario de la "BD"
  // Encuentra el índice del objeto con id enviado en la Request
  const index = usuarios.findIndex((usuario) => usuario.id === id);

  // Verifica que el objeto fue encontrado. Si el usuario no existe lanzamos un error 404
  if (index === -1) {
    return res.status(404).send("Usuario no encontrado");
  }

  if (index !== -1) {
    // Usa el índice para eliminar el objeto
    usuarios.splice(index, 1);
  }

  res.json({ message: "Usuario eliminado" });
});

app.put("/usuarios/:id", (req, res) => {
  // Obtenemos el ID del usuario de la solicitud
  const id = parseInt(req.params.id);

  // Buscamos el índice del usuario en el array
  const index = usuarios.findIndex((usuario) => usuario.id === id);

  // Verificamos que el usuario exista
  if (index === -1) {
    return res.status(404).send("Usuario no encontrado");
  }

  // Actualizamos el usuario con los nuevos datos
  usuarios[index] = { ...usuarios[index], ...req.body };

  // Devolvemos el usuario actualizado
  res.json(usuarios[index]);
});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("API escuchando en el puerto 3000");
});
