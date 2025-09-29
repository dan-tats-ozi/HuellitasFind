const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
app.use(express.json());
const SALT_ROUNDS = 10;

app.use(cors({
  origin: "http://127.0.0.1:5500"   // solo acepta peticiones desde tu frontend
}));

app.get("/", (req, res) => {
  res.send("¡Hola mundo desde Express!");
});

app.post("/login", async (req, res) => {
  const { user, password } = req.body;
  try {
    const resultado = await pool.query(
      "SELECT id, password_hash FROM users WHERE nombre = $1",
      [user]
    );
    if (resultado.rows.length === 0) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    const usuario = resultado.rows[0];
    const comparacion = await bcrypt.compare(password, usuario.password_hash);
    if (!comparacion) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    res.json({ mensaje: "Login exitoso", userId: usuario.id});
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const resultado = await pool.query(
      "SELECT nombre FROM users WHERE id = $1", [userId]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }else{
      const resultado2 = await pool.query(
      "SELECT nombre FROM mascotas WHERE id_user = $1", [userId]);
      res.json({ userName: resultado.rows[0].nombre, mascota: resultado.rows[0].nombre } );
    }
  } catch (error) {
    console.error("Error en /users/:id:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

app.post("/register", async (req, res) => {
  const { user, correo, mascotaNombre, tipoMascota, razaMascota, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const respuesta = await pool.query(
      "INSERT INTO users (password_hash, nombre, correo) VALUES ($1, $2, $3) RETURNING id",
      [hashedPassword, user, correo]
    );
    const userId = respuesta.rows[0].id;
    await pool.query("INSERT INTO mascotas (nombre, raza, especie, id_user) VALUES ($1, $2, $3, $4)", [mascotaNombre, razaMascota, tipoMascota, userId]);
    res.json({ mensaje: "Usuario registrado correctamente" });
  }
  catch (error) {
    console.error("Error en /register:", error);
    if (error.code === '23505') { // código de UNIQUE violation
    res.status(400).json({ mensaje: 'El nombre de usuario ya existe' });
  } else {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
