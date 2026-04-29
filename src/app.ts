import express from "express";

import { AvaliacaoController } from "./controllers/avaliacaoController";


export const app = express();

app.use(express.json());

AvaliacaoController();


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});