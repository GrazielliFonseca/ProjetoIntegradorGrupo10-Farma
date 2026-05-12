import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/suporte")({
  component: SupportPage,
});

function SupportPage() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.mensagem) return toast.error("Preencha os campos obrigatórios");
    toast.success("Mensagem enviada! Responderemos em breve.");
    setForm({ nome: "", email: "", assunto: "", mensagem: "" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 md:px-8">
      <div className="text-center">
        <span className="text-sm font-medium uppercase tracking-widest text-[--leaf]">Suporte</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">Como podemos ajudar?</h1>
        <p className="mt-3 text-muted-foreground">Envie sua mensagem e nossa equipe responde em até 24h.</p>
      </div>

      <form onSubmit={submit} className="mt-10 space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="assunto">Assunto</Label>
          <Input id="assunto" value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="mensagem">Mensagem</Label>
          <Textarea id="mensagem" rows={5} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} />
        </div>
        <Button type="submit" className="w-full">Enviar mensagem</Button>
      </form>
    </div>
  );
}
