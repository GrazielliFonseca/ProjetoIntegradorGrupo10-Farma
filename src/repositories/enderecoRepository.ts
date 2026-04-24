import db from "../database/database";
import { Endereco } from "../models/enderecoModel";

export class EnderecoRepository {
  
  salvarEndereco(dados: Partial<Endereco>): number | null {
    try {
      const stmt = db.prepare(`
        INSERT INTO endereco (rua, numero, complemento, bairro, cidade, estado, cep, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const resultado = stmt.run(
        dados.rua,
        dados.numero,
        dados.complemento || null,
        dados.bairro,
        dados.cidade,
        dados.estado,
        dados.cep,
        dados.id_usuario
      );

      return Number(resultado.lastInsertRowid);
    } catch (erro) {
      return null;
    }
  }

  buscarPorId(id: number): Endereco | null {
    try {
      return db.prepare("SELECT * FROM endereco WHERE id = ?").get(id) as Endereco;
    } catch (erro) {
      return null;
    }
  }
}