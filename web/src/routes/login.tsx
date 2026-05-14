import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => ({ redirect: s.redirect as string | undefined }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await login(email, password);
    if (!r.ok) return toast.error(r.error);
    toast.success("Bem-vindo de volta!");
    const isAdminLogin = email.trim().toLowerCase() === "admin@gmail.com";
    const dest = search.redirect ?? (isAdminLogin ? "/admin" : "/");
    navigate({ to: dest as "/" });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-20">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
        <h1 className="font-display text-3xl font-semibold">Entrar</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesse sua conta Calmavera</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/cadastro" search={{}} className="font-medium text-primary underline-offset-4 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
