const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("✅ Un utilisateur s’est connecté");

  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s’est déconnecté");
  });
});

const PORT = process.env.PORT || 3000; // Utilisation du port dynamique
http.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT || 3000}`);
});
