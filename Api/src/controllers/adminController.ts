import { app } from "../app";
import { AdminRepository } from "../repositories/adminRepository";

const ADMIN_USER = "admin@gmail.com";
const ADMIN_PASS = "admin";

export function AdminController() {
  const repository = new AdminRepository();

  app.post("/admin/login", (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
      return res.status(200).json({
        message: "Login administrativo bem-sucedido!",
        admin: { usuario: ADMIN_USER }
      });
    }

    return res.status(401).json({ message: "Credenciais administrativas inválidas." });
  });

  app.get("/admin/painel", async (req, res) => {
    try {
      const resumo = await repository.buscarResumo();
      const pedidos = await repository.listarPedidos();
      const usuarios = await repository.listarUsuarios();

      res.status(200).json({
        cards: resumo,
        listaPedidos: pedidos,
        listaUsuarios: usuarios
      });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno ao carregar painel";
      res.status(500).json({ message: mensagem });
    }
  });
}