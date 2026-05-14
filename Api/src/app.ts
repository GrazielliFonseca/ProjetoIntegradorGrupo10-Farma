import express from "express";

import { AvaliacaoController } from "./controllers/avaliacaoController";
import { CompraController } from "./controllers/compraController";
import { EnderecoController } from "./controllers/enderecoController";
import { ProdutoController } from "./controllers/produtoController";
import { UsuarioController } from "./controllers/usuarioController";
import { AdminController } from "./controllers/adminController";

export const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


AvaliacaoController();
CompraController();
EnderecoController();
ProdutoController();
UsuarioController();
AdminController();

app.listen(3010, () => {
  console.log("Servidor rodando em http://localhost:3010");
});