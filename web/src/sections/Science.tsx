import { Droplets, Shield, FlaskConical, CheckCircle2 } from "lucide-react";

const cards = [
  { icon: Droplets, title: "Hidratação", stat: "+30%", body: "Aumenta a hidratação do estrato córneo em quase 30%." },
  { icon: Shield, title: "Proteção", stat: "-27%", body: "Reduz a perda de água transepidérmica (PTEA) em cerca de 27%." },
  { icon: FlaskConical, title: "Eficácia", stat: "≈ corticoide", body: "Resultados comparáveis a corticoides de baixa potência no manejo de dermatites e eczemas, com menos efeitos colaterais." },
  { icon: CheckCircle2, title: "Segurança", stat: "6 meses", body: "Estabilidade garantida por testes preliminares de até 6 meses." },
];

export function Science() {
  return (
    <section id="ciencia" className="bg-gradient-soft py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-[--leaf]">Ciência</span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Ciência que funciona
          </h2>
          <p className="mt-4 text-muted-foreground">
            Resultados mensuráveis, validados por testes laboratoriais e estudos de estabilidade.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, stat, body }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-secondary text-[--leaf] transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <div className="font-display text-3xl font-semibold text-[--leaf]">{stat}</div>
              <h3 className="mt-1 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
