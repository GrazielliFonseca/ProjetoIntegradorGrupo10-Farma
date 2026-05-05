import { app } from "../app";
import { EnderecoRepository } from "../repositories/enderecoRepository";

export function EnderecoController() {
  const repository = new EnderecoRepository();

  app.post("/endereco", (req, res) => {
    try {
      const { rua, numero, complemento, bairro, cidade, estado, cep, id_usuario } = req.body;

      if (!rua) throw new Error("A rua é obrigatória.");
      if (!numero) throw new Error("O número é obrigatório.");
      if (!bairro) throw new Error("O bairro é obrigatório.");
      if (!cidade) throw new Error("A cidade é obrigatória.");
      if (!estado) throw new Error("O estado é obrigatório.");
      if (!cep) throw new Error("O CEP é obrigatório.");
      if (!id_usuario) throw new Error("O ID do usuário é obrigatório.");

      const novoEndereco = {
        rua,
        numero,
        complemento: complemento || "",
        bairro,
        cidade,
        estado,
        cep,
        id_usuario: Number(id_usuario)
      };

      const idCriado = repository.salvarEndereco(novoEndereco);

      if (!idCriado) {
        throw new Error("Erro ao salvar o endereço no banco de dados.");
      }

      res.status(201).json({
        id: idCriado,
        ...novoEndereco
      });

    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ message: mensagem });
    }
  });

  app.get("/endereco/:id", (req, res) => {
    try {
      const { id } = req.params;
      const endereco = repository.buscarPorId(Number(id));

      if (!endereco) {
        return res.status(404).json({ message: "Endereço não encontrado." });
      }

      res.json(endereco);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar endereço" });
    }
  });
}