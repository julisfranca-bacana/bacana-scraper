const express = require("express");

const app = express();

app.use((req, res) => {
  res.json({
    ok: true,
    path: req.path,
    message: "BACANA funcionando"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
