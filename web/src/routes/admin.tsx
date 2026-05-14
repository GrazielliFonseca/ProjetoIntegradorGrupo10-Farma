import { createFileRoute, Link, Outlet, useNavigate, useRouterState, redirect } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingCart, Users, LogOut, Leaf } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("calmavera:session");
      const u = raw ? JSON.parse(raw) : null;
      if (!u?.isAdmin) {
        throw redirect({ to: "/login", search: { redirect: "/admin" } });
      }
    } catch (e) {
      if ((e as { isRedirect?: boolean })?.isRedirect) throw e;
      throw redirect({ to: "/login", search: { redirect: "/admin" } });
    }
  },
  component: AdminLayout,
});

const navItems: { to: "/admin" | "/admin/compras" | "/admin/usuarios"; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/compras", label: "Compras", icon: ShoppingCart },
  { to: "/admin/usuarios", label: "Usuários", icon: Users },
];

function AdminLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();

  if (!isAuthenticated || !user?.isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Sessão encerrada");
    navigate({ to: "/login", search: {} });
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">Calmavera</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <div className="mb-2 px-3 py-2 text-xs">
            <div className="font-medium text-foreground">{user?.name}</div>
            <div className="truncate text-muted-foreground">{user?.email}</div>
          </div>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
          <h1 className="text-lg font-semibold">Painel Administrativo</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="md:hidden">
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
