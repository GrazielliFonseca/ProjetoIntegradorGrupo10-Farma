import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export function Footer() {
  const navigate = useNavigate();
  const { location } = useRouterState();

  const goSection = (hash: string) => {
    if (location.pathname !== "/") navigate({ to: "/", hash });
    else document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Cuidado natural com embasamento científico.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Links Rápidos</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["vitrine", "Vitrine"],
              ["ingredientes", "Ingredientes"],
              ["ciencia", "Ciência"],
              ["quem-somos", "Quem Somos"],
            ].map(([hash, label]) => (
              <li key={hash}>
                <button
                  onClick={() => goSection(hash)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Contato</h4>
          <a
            href="mailto:suporte@calmavera.com.br"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            <span>suporte@calmavera.com.br</span>
          </a>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-background text-muted-foreground shadow-soft transition-colors hover:text-primary"
                aria-label="Rede social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-base font-semibold">Suporte</h4>
          <p className="text-sm text-muted-foreground">
            Precisa de ajuda? Use o botão de suporte ou{" "}
            <Link to="/suporte" className="font-medium text-primary underline-offset-4 hover:underline">
              fale conosco
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="border-t border-border/60 bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground md:px-8">
          © 2026 Calmavera — Todos os direitos reservados. Desenvolvido por estudantes de Farmácia.
        </div>
      </div>
    </footer>
  );
}
