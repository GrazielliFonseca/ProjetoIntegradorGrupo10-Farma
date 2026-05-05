import { app } from "../app";
import { ProdutoRepository } from "../repositories/produtoRepository";
import { Produto } from "../models/produtoModel";

export function ProdutoController() {
  const repository = new ProdutoRepository();

  app.post("/produto", (req, res) => {
    try {
      const { 
        nome, 
        descricao_curta, 
        volume_ml, 
        indicacao, 
        preco, 
        estoque_minimo, 
        imagem_principal_url 
      } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("O nome do produto é obrigatório.");
      if (!volume_ml || volume_ml <= 0) throw new Error("O volume deve ser maior que zero.");
      if (!preco || preco < 0) throw new Error("O preço deve ser um valor válido.");
      
      const novoProduto: Produto = {
        nome,
        descricao_curta,
        volume_ml: Number(volume_ml),
        indicacao,
        preco: Number(preco),
        estoque_minimo: estoque_minimo ? Number(estoque_minimo) : 0,
        imagem_principal_url
      };

      const resultado = repository.salvarProduto(novoProduto);

      if (!resultado) {
        throw new Error("Erro ao salvar o produto no banco de dados.");
      }

      res.status(201).json(resultado);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno ao cadastrar produto";
      res.status(400).json({ message: mensagem });
    }
  });

  app.get("/produto", (req, res) => {
    try {
      const produtos = repository.mostrar(); 
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao mostrar produtos" });
    }
  });
}