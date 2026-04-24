import db from "../database/database";
import { Usuario } from "../models/usuarioModel";

export class UsuarioRepository {
  criarUsuario(usuario: Usuario): number | null {
    try {
      const stmt = db.prepare(`
        INSERT INTO usuario (nome, email, senha) 
        VALUES (?, ?, ?)
      `);
      const resultado = stmt.run(usuario.nome, usuario.email, usuario.senha);
      return Number(resultado.lastInsertRowid);
    } catch (erro) {
      return null;
    }
  }

    login(email: string, senha: string): Usuario | null {
    return db.prepare("SELECT * FROM usuario WHERE email = ? AND senha = ?")
             .get(email, senha) as Usuario ?? null;
  }
}
