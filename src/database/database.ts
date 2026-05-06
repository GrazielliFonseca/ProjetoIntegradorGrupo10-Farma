import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.resolve(__dirname, "../../database.db");
const schemaPath = fs.existsSync(path.resolve(__dirname, "./schema.sql"))
  ? path.resolve(__dirname, "./schema.sql")
  : path.resolve(process.cwd(), "src/database/schema.sql");

const db = new Database(dbPath);

const schema = fs.readFileSync(schemaPath, "utf-8");
db.exec(schema);

db.pragma("foreign_keys = ON");

const compraColumns = db.prepare("PRAGMA table_info(compra)").all() as Array<{
  name: string;
  notnull: number;
}>;
const formaPagtoColumn = compraColumns.find((column) => column.name === "forma_pagto");
const enderecoColumn = compraColumns.find((column) => column.name === "id_endereco");
const compraSql = db
  .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'compra'")
  .get() as { sql?: string } | undefined;

const compraPrecisaMigrar =
  formaPagtoColumn?.notnull === 1 ||
  enderecoColumn?.notnull === 1 ||
  compraSql?.sql?.includes("CHECK (qtd > 0)");

if (compraPrecisaMigrar) {
  db.pragma("foreign_keys = OFF");
  db.transaction(() => {
    db.exec(`
      CREATE TABLE compra_nova (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
        valor_total DECIMAL(10, 2) NOT NULL,
        quantidade INT NOT NULL CHECK (quantidade > 0),
        valor_unitario DECIMAL(10, 2) NOT NULL,
        forma_pagto VARCHAR(50) CHECK (forma_pagto IN ('Cartão de Crédito', 'Cartão de Débito', 'Pix')),
        status VARCHAR(50) DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Finalizado', 'Cancelado')),
        id_endereco INTEGER,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id),
        FOREIGN KEY (id_endereco) REFERENCES endereco(id)
      );

      INSERT INTO compra_nova (
        id, id_usuario, data_hora, valor_total, quantidade, valor_unitario,
        forma_pagto, status, id_endereco
      )
      SELECT
        id,
        id_usuario,
        data_hora,
        valor_total,
        quantidade,
        COALESCE(valor_unitario, valor_total / quantidade),
        forma_pagto,
        COALESCE(status, 'Pendente'),
        id_endereco
      FROM compra;

      DROP TABLE compra;
      ALTER TABLE compra_nova RENAME TO compra;
    `);
  })();
  db.pragma("foreign_keys = ON");
}

export default db;
