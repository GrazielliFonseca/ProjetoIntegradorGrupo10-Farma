import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import productImg from "@/assets/calmavera-product.jpg";
import { useAuth } from "@/lib/auth";
import { PRODUCT } from "@/lib/cart";
import { Droplet, Sparkles, ShieldCheck, Sun } from "lucide-react";

export const Route = createFileRoute("/produto")({
  component: ProductPage,
});

const indicacoes = [
  { icon: Droplet, title: "Hidratação Intensa", body: "Recupera peles muito secas ou com descamação." },
  { icon: Sparkles, title: "Recuperação da Pele", body: "Auxilia na cicatrização de pequenas feridas, acne e queimaduras leves, como as de sol." },
  { icon: ShieldCheck, title: "Alívio Imediato", body: "Acalma irritações, vermelhidão e coceiras em casos de dermatites e eczemas." },
  { icon: Sun, title: "Proteção Diária", body: "Atua contra danos da poluição e do sol devido à ação antioxidante." },
];

function ProductPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const buy = () => {
    if (!isAuthenticated) {
      navigate({ to: "/login", search: { redirect: "/checkout" } });
      return;
    }
    navigate({ to: "/checkout" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2.5rem] bg-[--accent]" />
          <img src={productImg} alt="Creme Calmavera" width={1024} height={1024} className="relative w-full rounded-[2.5rem] object-cover shadow-glow" />
        </div>

        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-[--leaf]">Produto</span>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight">{PRODUCT.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-foreground">R$ 45,00</span>
            <span className="text-muted-foreground">· {PRODUCT.ml}ml</span>
          </div>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Creme hidratante medicinal contendo camomila e aloe vera. Promove hidratação da pele,
            alívio de desconfortos leves, suaviza áreas sensibilizadas e proporciona sensação de
            frescor e bem-estar.
          </p>

          <Button onClick={buy} size="lg" className="mt-8 w-full bg-primary shadow-glow hover:bg-primary/90 sm:w-auto sm:px-12">
            Comprar
          </Button>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Indicação</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              O creme Calmavera é indicado para o cuidado e recuperação da pele em casos de:
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {indicacoes.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-secondary text-[--leaf]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
