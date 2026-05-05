import db from "../database/database";
import { Produto } from "../models/produtoModel";

export class ProdutoRepository {
  salvarProduto(produto: Produto):Produto | null {
    try {
      const resultado = db.prepare(`
        INSERT INTO produto (nome, descricao_curta, volume_ml, indicacao, preco, estoque_minimo, imagem_principal_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        produto.nome,
        produto.descricao_curta,
        produto.volume_ml,
        produto.indicacao,
        produto.preco,
        produto.estoque_minimo,
        produto.imagem_principal_url
    );

    return {
        ...produto,
        id: Number(resultado.lastInsertRowid)
    };

   } catch (erro) {
    return null;
  }
 }

 mostrar(): Produto[] {
    try {
      const produtos = db.prepare("SELECT * FROM produto").all() as Produto[];
      return produtos;
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      return [];
    }
  }
}