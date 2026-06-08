# 🌿 Calmavera — Plataforma de Vendas Online

> Plataforma digital para divulgação e venda do Creme Hidratante à base de babosa e camomila da marca Calmavera.

---

## Sobre o Projeto

A **Calmavera** é uma empresa de produtos naturais voltados ao cuidado da pele e bem-estar. Este projeto consiste no desenvolvimento de um site institucional e de e-commerce para ampliar o alcance da marca, melhorar a organização dos pedidos e facilitar o contato entre a empresa e seus clientes.

**Problema que resolve:**
Antes da plataforma, a empresa não contava com presença digital estruturada, o que limitava sua visibilidade, dificultava o gerenciamento de pedidos e tornava o contato com clientes descentralizado. O site resolve esses problemas ao centralizar o catálogo, as vendas e o suporte em um único ambiente digital acessível.

---

## Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **Node.js** | Ambiente de execução do servidor |
| **TypeScript** | Tipagem estática e maior segurança no desenvolvimento |
| **Express** | Framework para criação das rotas e APIs REST |
| **Better-SQLite3** | Banco de dados relacional local, leve e síncrono |

---

## Funcionalidades Principais

### Catálogo de Produtos
Exibição do produto principal — o Creme Hidratante Calmavera à base de babosa e camomila — com informações detalhadas sobre composição, benefícios e preço.

### Cadastro de Usuários
Registro e autenticação de clientes. O e-mail coletado serve exclusivamente para login seguro e acesso a funcionalidades como avaliações e compras.

### Vendas Online
Fluxo completo de compra com formulário de pedido contendo quantidade, valor total, nome do cliente, endereço de entrega e forma de pagamento.

### Painel Administrativo
Interface restrita para gestão de pedidos, acompanhamento de vendas e administração de conteúdo da plataforma.

### Suporte ao Cliente
Canal de contato direto entre clientes e a empresa para dúvidas.

### Avaliações de Produto
Clientes podem registrar avaliações sobre o produto, contribuindo para a credibilidade da marca.

---

## Arquitetura

O projeto segue uma arquitetura em camadas, separando claramente as responsabilidades:

- **Model** — Representação das entidades do sistema e definição da estrutura dos dados.
- **Controller** — Lógica de negócio e intermediação entre as requisições HTTP e a camada de repositório.
- **Repository** — Responsável pelo acesso e manipulação dos dados no banco, isolando as queries do restante da aplicação.
- **Database** — Configuração e inicialização da conexão com o banco de dados via Better-SQLite3.
- **schema.sql** — Arquivo SQL com a definição das tabelas, relacionamentos e estrutura inicial do banco de dados.

As rotas são expostas como **APIs REST** via Express, permitindo uma comunicação clara e padronizada entre front-end e back-end.

---

## Conformidade com a LGPD

A plataforma segue as diretrizes da **Lei Geral de Proteção de Dados (Lei nº 13.709/2018)**. Apenas os dados essenciais para faturamento e entrega são coletados (nome, endereço e forma de pagamento). O e-mail é usado exclusivamente para autenticação, sem envio de marketing. Todas as informações trafegam com **criptografia em trânsito**.

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- npm ou yarn

### Back-end (API)

```bash
# Clone o repositório
git clone https://github.com/GrazielliFonseca/ProjetoIntegradorGrupo10-Farma.git

# Acesse a pasta da API
cd ProjetoIntegradorGrupo10-Farma/api

# Instale as dependências
npm install

# Execute em ambiente de desenvolvimento
npm run dev
```

### Front-end (Web)

```bash
# Em outro terminal, acesse a pasta web
cd ProjetoIntegradorGrupo10-Farma/web

# Instale as dependências
npm install

# Execute em ambiente de desenvolvimento
npm run dev
```

---

## Estrutura de Pastas

```
ProjetoIntegradorGrupo10-Farma/
├── api/                     # Back-end da aplicação
│   ├── src/
│   │   ├── controllers/     # Lógica de negócio e tratamento das requisições
│   │   ├── models/          # Representação das entidades do sistema
│   │   ├── repositories/    # Acesso e manipulação dos dados no banco
│   │   ├── routes/          # Definição das rotas da API
│   │   └── database/        # Configuração e inicialização do banco de dados
│   ├── schema.sql           # Estrutura das tabelas e relacionamentos
│   └── package.json
├── web/                     # Front-end da aplicação
│   ├── src/
│   └── package.json
└── README.md
```

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos e comerciais da marca Calmavera. Todos os direitos reservados.
