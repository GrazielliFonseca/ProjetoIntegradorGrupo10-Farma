import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";
import { LogOut, User } from "lucide-react";

const sectionLinks = [
  { hash: "vitrine", label: "Vitrine" },
  { hash: "ingredientes", label: "Ingredientes" },
  { hash: "ciencia", label: "Ciência" },
  { hash: "depoimentos", label: "Depoimentos" },
  { hash: "quem-somos", label: "Quem Somos" },
  { hash: "faq", label: "FAQ" },
];

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const onHome = location.pathname === "/";
  const firstName = user?.name?.split(" ")[0] ?? "Usuário";

  const goSection = (hash: string) => {
    if (!onHome) {
      navigate({ to: "/", hash });
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {sectionLinks.map((s) => (
            <button
              key={s.hash}
              onClick={() => goSection(s.hash)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground sm:inline-flex">
                <User className="h-4 w-4" /> {firstName}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login" search={{}}>Login</Link>
              </Button>
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/cadastro" search={{}}>Cadastro</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
