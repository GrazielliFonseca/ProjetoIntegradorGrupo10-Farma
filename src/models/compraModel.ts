export interface Compra {
    id?: number;
    data_hora: Date;
    valor_total: number;
    qtd: number;
    valor_unitario: number;
    forma_pagto: 'Cartão de Crédito' | 'Cartão de Débito' | 'Pix' | string;
    status: 'Pendente' | 'Finalizado' | 'Cancelado' | string;
    id_usuario: number;
    id_endereco: number;
}