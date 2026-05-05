import { app } from "../app";
import { CompraRepository } from "../repositories/compraRepository";

export function CompraController() {
  const repository = new CompraRepository();

  app.post("/compra/iniciar", (req, res) => {
    try {
      const { id_usuario, valor_unitario, qtd } = req.body;

      if (!id_usuario) throw new Error("O ID do usuário é obrigatório.");
      if (!valor_unitario || valor_unitario <= 0) throw new Error("Valor unitário inválido.");
      if (!qtd || qtd <= 0) throw new Error("A quantidade deve ser maior que zero.");

      const id_compra = repository.iniciarCompra(
        Number(id_usuario),
        Number(valor_unitario),
        Number(qtd)
      );

      if (!id_compra) throw new Error("Erro ao processar início da compra no banco de dados.");

      res.status(201).json({ id_compra, message: "Compra iniciada com sucesso." });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ message: mensagem });
    }
  });

  app.put("/compra/endereco", (req, res) => {
    try {
      const { id_compra, id_endereco } = req.body;

      if (!id_compra) throw new Error("O ID da compra é obrigatório.");
      if (!id_endereco) throw new Error("O ID do endereço é obrigatório.");

      const sucesso = repository.vincularEndereco(Number(id_compra), Number(id_endereco));

      if (!sucesso) throw new Error("Não foi possível vincular o endereço. Verifique se a compra existe.");

      res.json({ message: "Endereço vinculado com sucesso." });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ message: mensagem });
    }
  });

  app.put("/compra/pagamento", (req, res) => {
    try {
      const { id_compra, forma_pagto } = req.body;

      const formasValidas = ['Cartão de Crédito', 'Cartão de Débito', 'Pix'];
      if (!formasValidas.includes(forma_pagto)) {
        throw new Error("Forma de pagamento inválida. Use: Cartão de Crédito, Cartão de Débito ou Pix.");
      }

      const sucesso = repository.definirPagamento(Number(id_compra), forma_pagto);

      if (!sucesso) throw new Error("Erro ao definir pagamento.");

      res.json({ message: "Forma de pagamento definida com sucesso." });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ message: mensagem });
    }
  });

  app.get("/compra/revisar/:id", (req, res) => {
    try {
      const { id } = req.params;
      const compraCompleta = repository.revisarCompra(Number(id));

      if (!compraCompleta) {
        return res.status(404).json({ message: "Compra não encontrada." });
      }

      res.json(compraCompleta);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao revisar compra" });
    }
  });

  app.put("/compra/finalizar", (req, res) => {
    try {
      const { id_compra } = req.body;

      if (!id_compra) throw new Error("O ID da compra é obrigatório para finalizar.");

      const sucesso = repository.finalizarCompra(Number(id_compra));

      if (!sucesso) throw new Error("Não foi possível finalizar a compra.");

      res.json({ message: "Compra finalizada com sucesso!" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ message: mensagem });
    }
  });
}