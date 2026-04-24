import { ItensCompra } from "./itensCompraModel";

export interface Compra {
    id?: number;
    data_hora: Date;
    valor_total: number;
    itens: ItensCompra[];
    forma_pagto: 'Cartão de Crédito' | 'Cartão de Débito' | 'Pix' | string;
    status: 'Pendente' | 'Finalizado' | 'Cancelado' | string;
    id_usuario: number;
    id_endereco: number;
}