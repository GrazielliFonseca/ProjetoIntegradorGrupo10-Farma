export interface Produto {
    id: number;
    nome: string;
    descricao_curta: string;
    volume_ml: number;
    indicacao: string;
    preco: number;
    estoque_minimo: number;
    imagem_principal_url: string;
}
