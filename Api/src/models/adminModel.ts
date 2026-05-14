//Models área administrativa
export interface CredenciaisAdmin {
  usuario: string;
  token?: string;
}

export interface ResumoDashboard {
  faturamentoTotal: number;
  itensVendidos: number;
  totalPedidos: number;
  ticketMedio: number;
}

export interface DetalhePedido {
  usuario: string;
  valorTotal: number;
  valorFrete: number;
  quantidade: number;
  data: string;
  endereco: string;
  pagamento: string;
}

export interface ListaUsuario {
  nome: string;
  dataCadastro: string;
}