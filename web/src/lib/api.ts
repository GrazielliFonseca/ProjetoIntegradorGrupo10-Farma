// Cliente HTTP para a API Calmavera
const BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4010";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) || `Erro ${res.status} em ${path}`;
    throw new Error(msg);
  }
  return data as T;
}

// ===== Tipos =====
export type Avaliacao = {
  id?: number;
  id_usuario: number;
  id_produto: number;
  estrelas: number;
  comentario: string;
  data?: string;
  nome_usuario?: string;
};

export type Usuario = { id?: number; nome: string; email: string; senha?: string };
export type LoginInput = { email: string; senha: string };
export type LoginResponse = { id: number; nome: string; email: string; token?: string };
type LoginApiResponse =
  | LoginResponse
  | {
      message?: string;
      usuario: LoginResponse;
    };

export type Endereco = {
  id?: number;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  id_usuario: number;
};

export type Produto = {
  id?: number;
  nome: string;
  descricao_curta: string;
  volume_ml: number;
  indicacao: string;
  preco: number;
  estoque_minimo: number;
  imagem_principal_url: string;
};

export type FormaPagamento = "Pix" | "Debito" | "Credito";

export type Compra = {
  id?: number;
  id_compra?: number;
  id_usuario: number;
  valor_unitario: number;
  quantidade: number;
  id_endereco?: number;
  forma_pagto?: FormaPagamento;
  status?: string;
};

type CompraIniciarResponse =
  | Compra
  | {
      id_compra: number;
      message?: string;
    };

// ===== Avaliações =====
export const avaliacaoApi = {
  criar: (data: Avaliacao) =>
    request<Avaliacao>("/avaliacao", { method: "POST", body: JSON.stringify(data) }),
  listar: () => request<Avaliacao[]>("/avaliacao"),
};

// ===== Compra =====
export const compraApi = {
  iniciar: async (data: { id_usuario: number; valor_unitario: number; quantidade: number }) => {
    const res = await request<CompraIniciarResponse>("/compra/iniciar", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return {
      ...data,
      ...res,
      id: "id_compra" in res ? res.id_compra : res.id,
    } as Compra;
  },
  vincularEndereco: (data: { id_compra: number; id_endereco: number }) =>
    request<Compra>("/compra/endereco", { method: "PUT", body: JSON.stringify(data) }),
  definirPagamento: (data: { id_compra: number; forma_pagto: FormaPagamento }) => {
    const formaPagtoApi: Record<FormaPagamento, string> = {
      Pix: "Pix",
      Debito: "Cartão de Débito",
      Credito: "Cartão de Crédito",
    };

    return request<Compra>("/compra/pagamento", {
      method: "PUT",
      body: JSON.stringify({ ...data, forma_pagto: formaPagtoApi[data.forma_pagto] }),
    });
  },
  revisar: (id: number) => request<Compra>(`/compra/revisar/${id}`),
  finalizar: (data: { id_compra: number }) =>
    request<Compra>("/compra/finalizar", { method: "PUT", body: JSON.stringify(data) }),
};

// ===== Endereços =====
export const enderecoApi = {
  cadastrar: (data: Endereco) =>
    request<Endereco>("/endereco", { method: "POST", body: JSON.stringify(data) }),
  buscar: (id: number) => request<Endereco>(`/endereco/${id}`),
};

// ===== Usuários =====
export const usuarioApi = {
  criar: (data: { nome: string; email: string; senha: string }) =>
    request<Usuario>("/usuario", { method: "POST", body: JSON.stringify(data) }),
  login: async (data: LoginInput) => {
    const res = await request<LoginApiResponse>("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return "usuario" in res ? res.usuario : res;
  },
};

// ===== Produto =====
export const produtoApi = {
  cadastrar: (data: Produto) =>
    request<Produto>("/produto", { method: "POST", body: JSON.stringify(data) }),
  listar: () => request<Produto[]>("/produto"),
};

export const api = {
  avaliacao: avaliacaoApi,
  compra: compraApi,
  endereco: enderecoApi,
  usuario: usuarioApi,
  produto: produtoApi,
};
