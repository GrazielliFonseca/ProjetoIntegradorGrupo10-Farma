import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { adminApi, type AdminUsuario } from "@/lib/api";

export const Route = createFileRoute("/admin/usuarios")({
  component: UsuariosPage,
});

const fallback: AdminUsuario[] = [
  { nome: "Ana Souza", data_cadastro: "2026-01-12" },
  { nome: "Carlos Lima", data_cadastro: "2026-02-03" },
  { nome: "Beatriz Mota", data_cadastro: "2026-02-19" },
  { nome: "Diego Reis", data_cadastro: "2026-03-04" },
  { nome: "Eduarda Pires", data_cadastro: "2026-03-22" },
  { nome: "Felipe Nunes", data_cadastro: "2026-04-01" },
  { nome: "Gabriela Alves", data_cadastro: "2026-04-15" },
  { nome: "Henrique Dias", data_cadastro: "2026-04-28" },
];

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<AdminUsuario[]>(fallback);

  useEffect(() => {
    adminApi
      .painel()
      .then((p) => {
        if (p.usuarios?.length) setUsuarios(p.usuarios);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Usuários cadastrados</h2>
        <p className="text-sm text-muted-foreground">{usuarios.length} contas ativas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((u, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{u.nome}</TableCell>
                  <TableCell>{new Date(u.data_cadastro).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
