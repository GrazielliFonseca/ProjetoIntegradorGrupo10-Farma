import db from "../database/database";
import { Avaliacao } from "../models/avaliacaoModel";

export class AvaliacaoRepository {
  
  CriarAvaliacao(avaliacao: Avaliacao): Avaliacao {

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

    const novaAvaliacao = { 
        ...avaliacao, 
        id: Number(resultado.lastInsertRowid),
    };
    return novaAvaliacao;
  }


  mostrar(): Avaliacao[] {
    const avaliacoes = db.prepare("SELECT * FROM avaliacao").all() as Avaliacao[];
    return avaliacoes;
  }
}

