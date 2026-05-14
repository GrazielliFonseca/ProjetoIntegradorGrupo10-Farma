import db from "../database/database";
import { Avaliacao } from "../models/avaliacaoModel";

export class AvaliacaoRepository {
  
  CriarAvaliacao(avaliacao: Avaliacao): number {

    if (!avaliacao.id_usuario || avaliacao.id_usuario <= 0) {
      throw new Error("Operação negada: Apenas usuários logados podem realizar avaliações.");
    }
  
    const resultado = db
      .prepare(`
        INSERT INTO avaliacao (estrelas, comentario, data_avaliacao, id_produto, id_usuario) 
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        avaliacao.estrelas, 
        avaliacao.comentario, 
        avaliacao.data_avaliacao, 
        avaliacao.id_produto, 
        avaliacao.id_usuario
      );

    return Number(resultado.lastInsertRowid);
  }

  buscarPorId(id: number): Avaliacao | null {
    const sql = `
      SELECT 
        a.*, 
        u.nome AS nome_usuario 
      FROM avaliacao a
      LEFT JOIN usuario u ON a.id_usuario = u.id
      WHERE a.id = ?
    `;
    return db.prepare(sql).get(id) as Avaliacao | null;
  }
  
  mostrar(): Avaliacao[] {
    const sql = `
      SELECT 
        a.*, 
        u.nome AS nome_usuario 
      FROM avaliacao a
      LEFT JOIN usuario u ON a.id_usuario = u.id
      ORDER BY a.data_avaliacao DESC
    `;
    
    const avaliacoes = db.prepare(sql).all() as Avaliacao[];
    return avaliacoes;
  }
} 