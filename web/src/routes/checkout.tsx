import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useCart, PRODUCT } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import productImg from "@/assets/calmavera-product.jpg";
import { Minus, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { compraApi, enderecoApi, type FormaPagamento } from "@/lib/api";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const steps = ["Revisar Pedido", "Endereço", "Pagamento", "Confirmação"] as const;

function CheckoutPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { data, setQuantity, setAddress, setPayment, reset } = useCart();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const finalizar = async () => {
    if (!user?.id) return toast.error("Faça login novamente");
    setLoading(true);
    try {
      const compra = await compraApi.iniciar({
        id_usuario: user.id,
        valor_unitario: PRODUCT.price,
        quantidade: data.quantity,
      });
      const idCompra = compra.id!;
      const endereco = await enderecoApi.cadastrar({ ...data.address, id_usuario: user.id });
      await compraApi.vincularEndereco({ id_compra: idCompra, id_endereco: endereco.id! });
      const formaMap: Record<string, FormaPagamento> = {
        pix: "Pix",
        debito: "Debito",
        credito: "Credito",
      };
      await compraApi.definirPagamento({
        id_compra: idCompra,
        forma_pagto: formaMap[data.payment],
      });
      await compraApi.finalizar({ id_compra: idCompra });
      toast.success("Compra realizada com sucesso! 🌿");
      reset();
      navigate({ to: "/" });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login", search: { redirect: "/checkout" } });
  }, [isAuthenticated, navigate]);

  const subtotal = PRODUCT.price * data.quantity;
  const total = subtotal + PRODUCT.shipping;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Finalizar compra</h1>

      <ol className="mt-8 flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors ${i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"}`}>
            {i < step ? <Check className="h-3.5 w-3.5" /> : <span className="font-medium">{i + 1}</span>}
            <span className="hidden sm:inline">{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        {step === 0 && (
          <div>
            <h2 className="font-display text-2xl font-semibold">Revisar pedido</h2>
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-secondary/50 p-4">
              <img src={productImg} alt="Calmavera" width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold">{PRODUCT.name}</h3>
                <p className="text-sm text-muted-foreground">Creme hidratante · {PRODUCT.ml}ml</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-background p-1">
                <Button size="icon" variant="ghost" onClick={() => setQuantity(data.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                <span className="w-6 text-center font-medium">{data.quantity}</span>
                <Button size="icon" variant="ghost" onClick={() => setQuantity(data.quantity + 1)}><Plus className="h-3 w-3" /></Button>
              </div>
              <div className="font-display text-lg font-semibold">R$ {subtotal.toFixed(2).replace(".", ",")}</div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setStep(1)}>Continuar</Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const a = data.address;
              if (!a.cep || !a.rua || !a.bairro || !a.estado || !a.cidade || !a.numero) {
                toast.error("Preencha o endereço completo");
                return;
              }
              setStep(2);
            }}
          >
            <h2 className="font-display text-2xl font-semibold">Endereço de entrega</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["cep", "CEP"], ["rua", "Rua"], ["bairro", "Bairro"],
                ["cidade", "Cidade"], ["estado", "Estado"], ["numero", "Número"],
              ].map(([key, label]) => (
                <div key={key} className={key === "rua" ? "sm:col-span-2" : ""}>
                  <Label htmlFor={key}>{label}</Label>
                  <Input
                    id={key}
                    value={(data.address as Record<string, string>)[key]}
                    onChange={(e) => setAddress({ ...data.address, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input id="complemento" value={data.address.complemento} onChange={(e) => setAddress({ ...data.address, complemento: e.target.value })} />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(0)}>Voltar</Button>
              <Button type="submit">Continuar</Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl font-semibold">Forma de pagamento</h2>
            <RadioGroup value={data.payment} onValueChange={(v) => setPayment(v as never)} className="mt-6 space-y-3">
              {[
                ["debito", "Cartão de Débito"],
                ["credito", "Cartão de Crédito"],
                ["pix", "Pix"],
              ].map(([val, label]) => (
                <label key={val} htmlFor={val} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary/50">
                  <RadioGroupItem id={val} value={val} />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </RadioGroup>
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>Voltar</Button>
              <Button
                onClick={() => {
                  if (!data.payment) return toast.error("Selecione uma forma de pagamento");
                  setStep(3);
                }}
              >
                Finalizar Pedido
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-2xl font-semibold">Resumo final</h2>
            <p className="mt-2 text-sm text-muted-foreground">Confira tudo antes de realizar a compra.</p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-secondary/50 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Produto</div>
                <div className="mt-1 flex justify-between font-medium">
                  <span>{PRODUCT.name} × {data.quantity}</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                  <span>Frete</span>
                  <span>R$ {PRODUCT.shipping.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-lg font-semibold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-secondary/50 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Endereço</div>
                <p className="mt-1 text-sm">
                  {data.address.rua}, {data.address.numero}
                  {data.address.complemento ? ` — ${data.address.complemento}` : ""}<br />
                  {data.address.bairro} — {data.address.cidade}/{data.address.estado}<br />
                  CEP {data.address.cep}
                </p>
              </div>

              <div className="rounded-2xl bg-secondary/50 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Pagamento</div>
                <p className="mt-1 text-sm capitalize">{data.payment}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(2)} disabled={loading}>Voltar</Button>
              <Button
                size="lg"
                className="bg-primary shadow-glow"
                disabled={loading}
                onClick={finalizar}
              >
                {loading ? "Processando..." : "Realizar Compra"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
