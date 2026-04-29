import { app } from "../app";
import { avaliacaoRepository } from "../repositories/avaliacaoRepository";

export function AvaliacaoController() {
  const repository = avaliacaoRepository;

  app.post("/avaliacao",  (req, res) => {
    try {
        const { nota, comentario, id_cliente, id_produto } = req.body;
      if (!comentario) throw new Error("O comentário é obrigatório.");
      if (!id_produto) throw new Error("O ID do produto é obrigatório.");
      if (!nota || nota < 1 || nota > 5) throw new Error("A nota deve estar entre 1 e 5.");
      if (!id_cliente) throw new Error("O ID do cliente é obrigatório.");
    
      const resultado = repository.CriarAvaliacao(
        nota,
        comentario,
        Number(id_cliente),
        Number(id_produto),
      );
      
    res.status(201).json(resultado);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno ao processar avaliação";
      res.status(400).json({ message: mensagem });
    }
  });

   app.get("/avaliacao", async (req, res) => {
   try {
     const avaliacoes = await avaliacaoRepository.listar();
     res.json(avaliacoes);
   } catch (error) {
     res.status(500).json({ erro: "Erro ao listar avaliações" });
   }
});
}