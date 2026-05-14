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
import { Badge } from "@/components/ui/badge";
import { adminApi, type AdminCompra } from "@/lib/api";

export const Route = createFileRoute("/admin/compras")({
  component: ComprasPage,
});

const FRETE = 15;

const fallback: AdminCompra[] = [
  { usuario: "Ana Souza", valor: 45, quantidade: 2, data: "2026-05-02", endereco: "Rua das Flores, 120 — São Paulo/SP", forma_pagto: "Pix" },
  { usuario: "Carlos Lima", valor: 45, quantidade: 1, data: "2026-05-04", endereco: "Av. Brasil, 998 — Rio de Janeiro/RJ", forma_pagto: "Crédito" },
  { usuario: "Beatriz Mota", valor: 45, quantidade: 3, data: "2026-05-05", endereco: "Rua Verde, 45 — Curitiba/PR", forma_pagto: "Débito" },
  { usuario: "Diego Reis", valor: 45, quantidade: 1, data: "2026-05-06", endereco: "Av. Paulista, 1000 — São Paulo/SP", forma_pagto: "Pix" },
  { usuario: "Eduarda Pires", valor: 45, quantidade: 2, data: "2026-05-07", endereco: "Rua A, 12 — Belo Horizonte/MG", forma_pagto: "Crédito" },
  { usuario: "Felipe Nunes", valor: 45, quantidade: 4, data: "2026-05-08", endereco: "Rua B, 78 — Porto Alegre/RS", forma_pagto: "Pix" },
  { usuario: "Gabriela Alves", valor: 45, quantidade: 1, data: "2026-05-09", endereco: "Av. Central, 200 — Salvador/BA", forma_pagto: "Débito" },
];

function fmt(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ComprasPage() {
  const [compras, setCompras] = useState<AdminCompra[]>(fallback);

  useEffect(() => {
    adminApi
      .painel()
      .then((p) => {
        if (p.compras?.length) setCompras(p.compras);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Compras realizadas</h2>
        <p className="text-sm text-muted-foreground">{compras.length} pedidos confirmados</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Pagamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compras.map((c, i) => {
                const total = c.valor * c.quantidade + FRETE;
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{c.usuario}</TableCell>
                    <TableCell>{c.quantidade}</TableCell>
                    <TableCell>{fmt(total)}</TableCell>
                    <TableCell>{new Date(c.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className="max-w-xs truncate">{c.endereco}</TableCell>
                    <TableCell><Badge variant="secondary">{c.forma_pagto}</Badge></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
