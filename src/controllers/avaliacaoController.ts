import { app } from "../app";
import { AvaliacaoRepository } from "../repositories/avaliacaoRepository";

export function AvaliacaoController() {
  const repository = new AvaliacaoRepository();

  app.post("/avaliacao", (req, res) => {
    try {
      const { nota, comentario, id_usuario, id_produto } = req.body;
      
      if (!comentario) throw new Error("O comentário é obrigatório.");
      if (!id_produto) throw new Error("O ID do produto é obrigatório.");
      if (!nota || nota < 1 || nota > 5) throw new Error("A nota deve estar entre 1 e 5.");
      if (!id_usuario) throw new Error("O ID do usuário é obrigatório.");

      const novaAvaliacao = {
        estrelas: nota,
        descricao: comentario,
        id_usuario: Number(id_usuario),
        id_produto: Number(id_produto),
        data_avaliacao: new Date()
      };

      const resultado = repository.CriarAvaliacao(novaAvaliacao);
      
      res.status(201).json(resultado);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ message: mensagem });
    }
  });

  app.get("/avaliacao", (req, res) => {
    try {
      const avaliacoes = repository.mostrar();
      res.json(avaliacoes);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao mostrar avaliações" });
    }
  });
}