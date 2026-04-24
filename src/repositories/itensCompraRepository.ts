import db from "../database/database";

export class ItensCompraRepository {
  salvarItem (id_compra:number, item: any): void {
      db.prepare(`
        INSERT INTO itens_compra (id_compra, id_produto, qtd, valor_unitario)
        VALUES (?, ?, ?, ?)
      `)
      .run(id_compra, item.id_produto, item.qtd, item.valor_unitario);
  }
}
