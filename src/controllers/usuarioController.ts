import { app } from "../app";
import { UsuarioRepository } from "../repositories/usuarioRepository";
import { Usuario } from "../models/usuarioModel";

export function UsuarioController() {
  const repository = new UsuarioRepository();

  app.post("/usuario", (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("O nome é obrigatório.");
      if (!email || !email.includes("@")) throw new Error("E-mail inválido.");
      if (!senha || senha.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres.");

      const novoUsuario: Usuario = {
        nome,
        email,
        senha
      };

      const idCriado = repository.criarUsuario(novoUsuario);

      if (!idCriado) {
        throw new Error("Erro ao criar usuário. O e-mail já pode estar em uso.");
      }

      res.status(201).json({
        id: idCriado,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      });

    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno ao processar cadastro";
      res.status(400).json({ message: mensagem });
    }
  });

  app.post("/login", (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
      }

      const usuario = repository.login(email, senha);

      if (!usuario) {
        return res.status(401).json({ message: "E-mail ou senha incorretos." });
      }

      res.json({
        message: "Login realizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });

    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno no login";
      res.status(400).json({ message: mensagem });
    }
  });
}