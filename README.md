# 🌿 Calmavera - Backend E-commerce

O **Calmavera** é uma API REST desenvolvida para gerenciar a venda de um creme cicatrizante natural. O projeto foi construído focado em escalabilidade e organização de código, utilizando uma arquitetura profissional para separação de responsabilidades.

## 🚀 Tecnologias Utilizadas

| Tecnologia | Função |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript |
| **TypeScript** | Tipagem estática e segurança de código |
| **Express** | Framework para gerenciamento de rotas e middleware |
| **Better-SQLite3** | Banco de dados SQL local de alta performance |
| **Nodemon / ts-node** | Agilidade no fluxo de desenvolvimento |

---

## 🏛️ Arquitetura do Projeto

O projeto segue o padrão de camadas para facilitar a manutenção e testes:

* **Model**: Definição das entidades e classes de negócio (Produto, Pedido, Usuário).
* **Repository**: Camada de persistência responsável por toda a comunicação com o banco de dados (Queries SQL e comandos DML).
* **Controller**: Responsável por receber as requisições HTTP, aplicar validações de entrada e retornar as respostas para o Frontend.
* **Database**: Configuração e integração direta com o **SQLite**, garantindo que a aplicação seja leve e fácil de rodar localmente.

---

## 🛠️ Funcionalidades Principais

* [x] Listagem e busca de produtos (Creme Calmavera).
* [x] Validação de dados via Controller para garantir integridade.
* [x] Persistência de dados robusta com SQLite.
* [x] Tipagem total do sistema com TypeScript, reduzindo erros em tempo de execução.

---

## 🔧 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/GrazielliFonseca/ProjetoIntegradorGrupo10-Farma.git
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor:**
    ```bash
    npm start
    ```
    > **Dica:** O servidor iniciará automaticamente através do `ts-node` e `nodemon`. Lembre-se sempre de verificar o console para ver o `print()` de confirmação da conexão!

---

## 👩‍💻 Sobre mim

Estou em transição para o mercado de tecnologia, atualmente cursando Técnico em Informática e focando em desenvolvimento **Back-end**. Este projeto demonstra minha habilidade em estruturar bancos de dados relacionais e criar APIs seguras e tipadas.
