import express from "express";

import { AvaliacaoController } from "./controllers/avaliacaoController";
import { CompraController } from "./controllers/compraController";
import { EnderecoController } from "./controllers/enderecoController";
import { ProdutoController } from "./controllers/produtoController";
import { UsuarioController } from "./controllers/usuarioController";

export const app = express();

app.use(express.json());

AvaliacaoController();
CompraController();
EnderecoController();
ProdutoController();
UsuarioController();

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});