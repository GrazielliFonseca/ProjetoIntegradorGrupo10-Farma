import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import productImg from "@/assets/calmavera-product.jpg";
import { Leaf, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="vitrine" className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[--accent] blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[--sage] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-background/70 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <Leaf className="h-3.5 w-3.5" />
            100% natural · embasamento científico
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Pele em paz,
            <br />
            <span className="italic text-[--leaf]">naturalmente.</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Calmavera é um creme hidratante medicinal com camomila e aloe vera —
            cuidado profundo para peles sensibilizadas, ressecadas ou em recuperação.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button asChild size="lg" className="bg-primary px-8 text-base shadow-glow hover:bg-primary/90">
              <Link to="/produto">
                Compre agora! <Sparkles className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <div className="text-sm">
              <span className="font-display text-3xl font-semibold text-foreground">R$ 45,00</span>
              <span className="ml-2 text-muted-foreground">· 310ml</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[2.5rem] bg-[--accent]" />
          <img
            src={productImg}
            alt="Pote de creme Calmavera com flores de camomila e folhas de aloe vera"
            width={1024}
            height={1024}
            className="relative w-full rounded-[2.5rem] object-cover shadow-glow"
          />
        </div>
      </div>
    </section>
  );
}
