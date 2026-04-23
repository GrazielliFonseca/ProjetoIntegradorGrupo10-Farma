export interface Avaliacao {
    id: number;
    estrelas: number;
    descricao: string;
    data_avaliacao: Date;
    id_produto: number;
    id_usuario: number;
}
