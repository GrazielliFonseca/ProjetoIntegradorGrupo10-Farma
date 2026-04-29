import db from "../database/database";
import { Compra } from "../models/compraModel";

export class CompraRepository {

  iniciarCompra(id_usuario: number, valor_unitario: number, qtd: number): number | null {
  try {
    const stmt = db.prepare(`
      INSERT INTO compra (id_usuario, valor_total, quantidade, status, data_hora) 
      VALUES (?, ?, ?, 'Pendente', datetime('now'))
    `);

    const resultado = stmt.run(id_usuario, valor_unitario, qtd);
    const id_compra = Number(resultado.lastInsertRowid);

    return id_compra;
  } catch (erro) {
    console.error("Erro ao iniciar compra:", erro);
    return null;
  }
}

  // Define a FK do endereço que já deve estar cadastrado
  vincularEndereco(id_compra: number, id_endereco: number): boolean {
    try {
      const stmt = db.prepare("UPDATE compra SET id_endereco = ? WHERE id = ?");
      const resultado = stmt.run(id_endereco, id_compra);
      return resultado.changes > 0;
    } catch (erro) {
      return false;
    }
  }

  definirPagamento(id_compra: number, forma_pagto: string): boolean {
    try {
      const stmt = db.prepare("UPDATE compra SET forma_pagto = ? WHERE id = ?");
      const resultado = stmt.run(forma_pagto, id_compra);
      return resultado.changes > 0;
    } catch (erro) {
      return false;
    }
  }

  revisarCompra(id_compra: number): any {
    try {
      // Busca a compra, os dados do usuário e os dados do endereço via JOIN
      const compra = db.prepare(`
        SELECT c.*, e.cep, e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.estado
        FROM compra c
        LEFT JOIN endereco e ON c.id_endereco = e.id
        WHERE c.id = ?
      `).get(id_compra) as any;

      if (!compra) return null;

      return compra;
    } catch (erro) {
      return null;
    }
  }

  finalizarCompra(id_compra: number): boolean {
    try {
      const stmt = db.prepare("UPDATE compra SET status = 'Finalizada' WHERE id = ?");
      const resultado = stmt.run(id_compra);
      return resultado.changes > 0;
    } catch (erro) {
      return false;
    }
  }
}
