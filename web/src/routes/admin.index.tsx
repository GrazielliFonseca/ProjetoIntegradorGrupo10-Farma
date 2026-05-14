import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { adminApi, type AdminMetricaMensal } from "@/lib/api";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const fallbackSales: AdminMetricaMensal[] = [
  { mes: "Jan", vendas: 28, faturamento: 1260 },
  { mes: "Fev", vendas: 35, faturamento: 1575 },
  { mes: "Mar", vendas: 42, faturamento: 1890 },
  { mes: "Abr", vendas: 38, faturamento: 1710 },
  { mes: "Mai", vendas: 51, faturamento: 2295 },
  { mes: "Jun", vendas: 64, faturamento: 2880 },
  { mes: "Jul", vendas: 58, faturamento: 2610 },
];

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function AdminDashboard() {
  const [salesByMonth, setSalesByMonth] = useState<AdminMetricaMensal[]>(fallbackSales);
  const [totals, setTotals] = useState(() => {
    const itens = fallbackSales.reduce((s, m) => s + m.vendas, 0);
    const fat = fallbackSales.reduce((s, m) => s + m.faturamento, 0);
    const pedidos = Math.round(itens * 0.78);
    return { itens, fat, pedidos, ticket: fat / pedidos };
  });

  useEffect(() => {
    adminApi
      .painel()
      .then((p) => {
        if (p.vendas_por_mes?.length) setSalesByMonth(p.vendas_por_mes);
        const itens = p.itens_vendidos ?? totals.itens;
        const fat = p.faturamento_total ?? totals.fat;
        const pedidos = p.total_pedidos ?? totals.pedidos;
        const ticket = p.ticket_medio ?? (pedidos ? fat / pedidos : 0);
        setTotals({ itens, fat, pedidos, ticket });
      })
      .catch(() => {
        // mantém fallback
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const metrics = [
    { label: "Faturamento Total", value: fmtBRL(totals.fat), icon: DollarSign, delta: "+12,4%" },
    { label: "Itens Vendidos", value: totals.itens.toString(), icon: Package, delta: "+8,1%" },
    { label: "Total de Pedidos", value: totals.pedidos.toString(), icon: ShoppingBag, delta: "+5,7%" },
    { label: "Ticket Médio", value: fmtBRL(totals.ticket), icon: TrendingUp, delta: "+3,2%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Visão geral</h2>
        <p className="text-sm text-muted-foreground">Relatórios de vendas e desempenho</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{m.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{m.value}</div>
                <p className="text-xs text-emerald-600">{m.delta} vs. mês anterior</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Volume de vendas (itens)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Faturamento mensal (R$)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="faturamento"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
