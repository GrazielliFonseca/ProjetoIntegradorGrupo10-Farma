CREATE TABLE IF NOT EXISTS usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100) NOT NULL CHECK (length(trim(nome)) > 0),
  email VARCHAR(100) UNIQUE NOT NULL CHECK (email LIKE '%@%'),
  senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS endereco (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  cep VARCHAR(9) NOT NULL,
  rua VARCHAR(100) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(100),
  bairro VARCHAR(50) NOT NULL,
  cidade VARCHAR(50) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS produto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(100) NOT NULL CHECK (length(trim(nome)) > 0),
  descricao_curta TEXT,
  volume_ml INT NOT NULL CHECK (volume_ml > 0),
  indicacao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  estoque_minimo INT DEFAULT 0,
  imagem_principal_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS avaliacao (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INT NOT NULL,
  id_produto INT NOT NULL,
  estrelas INT NOT NULL CHECK (estrelas BETWEEN 1 AND 5),
  descricao VARCHAR(255),
  data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_produto) REFERENCES produto(id)
);

CREATE TABLE IF NOT EXISTS compra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_usuario INTEGER NOT NULL,
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
  valor_total DECIMAL(10, 2) NOT NULL,
  forma_pagto VARCHAR(50) NOT NULL CHECK (forma_pagto IN ('Cartão de Crédito', 'Cartão de Débito', 'Pix')), 
  status VARCHAR(50) DEFAULT 'Pendente',
  id_endereco INTEGER NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

CREATE TABLE IF NOT EXISTS itens_compra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_compra INT not NULL,
  id_produto INT not NULL,
  qtd INT not NULL CHECK (qtd > 0),
  valor_unitario DECIMAL(10,2) not NULL CHECK (valor_unitario >= 0),
  FOREIGN KEY (id_compra) REFERENCES compra(id),
  FOREIGN KEY (id_produto) REFERENCES produto(id)
);