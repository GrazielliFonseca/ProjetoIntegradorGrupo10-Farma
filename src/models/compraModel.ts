import { ItensCompra } from "./itensCompraModel";

export interface Compra {
    id: number;
    data_hora: Date;
    valor_total: number;
    itens: ItensCompra[];
    forma_pagto: string;
    id_usuario: number;
    id_endereco: number;
}
