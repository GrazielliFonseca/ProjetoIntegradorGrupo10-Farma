import db from "../database/database";
import { ResumoDashboard, DetalhePedido, ListaUsuario } from "../models/adminModel";

export class AdminRepository {

  buscarResumo(): ResumoDashboard {
  const sql = `
  SELECT 
    u.nome as usuario,
    (c.valor_total + c.valor_frete) as valorTotal,
    c.valor_frete as valorFrete, -- Garante que o frete venha separado se precisar
    c.quantidade,
    c.data_hora as data,
    (e.rua || ', ' || e.numero || ' - ' || e.cidade || '/' || e.estado) as endereco,
    c.forma_pagto as pagamento
  FROM compra c
  JOIN usuario u ON c.id_usuario = u.id
  JOIN endereco e ON c.id_endereco = e.id
  ORDER BY c.data_hora DESC
`;
  
  const resultado = db.prepare(sql).get() as ResumoDashboard;
  
  return {
    faturamentoTotal: resultado.faturamentoTotal || 0,
    itensVendidos: resultado.itensVendidos || 0,
    totalPedidos: resultado.totalPedidos || 0,
    ticketMedio: resultado.ticketMedio || 0
  };
}
  listarPedidos(): DetalhePedido[] {
  const sql = `
    SELECT 
      u.nome as usuario,
      (c.valor_total + c.valor_frete) as valorTotal,
      c.quantidade,
      c.data_hora as data,
      -- Concatenando apenas Rua, Número, Cidade e Estado
      (e.rua || ', ' || e.numero || ' - ' || e.cidade || '/' || e.estado) as endereco,
      c.forma_pagto as pagamento
    FROM compra c
    JOIN usuario u ON c.id_usuario = u.id
    JOIN endereco e ON c.id_endereco = e.id
    ORDER BY c.data_hora DESC
  `;
  return db.prepare(sql).all() as DetalhePedido[];
}

  listarUsuarios(): ListaUsuario[] {
    const sql = `
      SELECT 
        nome, 
        data_cadastro as dataCadastro 
      FROM usuario
      ORDER BY data_cadastro DESC
    `;
   const usuarios = db.prepare(sql).all() as ListaUsuario[];
   console.log("Usuários encontrados no banco:", usuarios);
  return usuarios;
  }
}