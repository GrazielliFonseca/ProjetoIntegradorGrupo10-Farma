import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LifeBuoy } from "lucide-react";
import { toast } from "sonner";

export function SupportButton() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.mensagem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Mensagem enviada! Responderemos em breve.");
    setForm({ nome: "", email: "", assunto: "", mensagem: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
          aria-label="Abrir suporte"
        >
          <LifeBuoy className="h-4 w-4" />
          <span className="hidden sm:inline">Ajuda</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Fale com o suporte</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="s-nome">Nome</Label>
            <Input id="s-nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="s-email">E-mail</Label>
            <Input id="s-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="s-assunto">Assunto</Label>
            <Input id="s-assunto" value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="s-msg">Mensagem</Label>
            <Textarea id="s-msg" rows={4} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">Enviar mensagem</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
