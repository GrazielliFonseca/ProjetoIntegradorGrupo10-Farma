import db from "../database/database";
import { Avaliacao } from "../models/avaliacaoModel";

export class avaliacaoRepository {
  
  CriarAvaliacao(avaliacao: Avaliacao): Avaliacao {

    if (!avaliacao.id_usuario || avaliacao.id_usuario <= 0) {
      throw new Error("Operação negada: Apenas usuários autenticados podem realizar avaliações.");
    }
    const data = avaliacao.data_avaliacao || new Date().toISOString();
  
    const resultado = db
      .prepare(`
        INSERT INTO avaliacao (estrelas, descricao, data_avaliacao, id_produto, id_usuario) 
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        avaliacao.estrelas, 
        avaliacao.descricao, 
        data, 
        avaliacao.id_produto, 
        avaliacao.id_usuario
      );

    const novaAvaliacao = { 
        ...avaliacao, 
        id: Number(resultado.lastInsertRowid),
        data_avaliacao: data 
    };
    return novaAvaliacao;
  }


  listar(): Avaliacao[] {
    const avaliacoes = db.prepare("SELECT * FROM avaliacao").all() as Avaliacao[];
    return avaliacoes;
  }
}

