import botanical from "@/assets/calmavera-botanical.jpg";

const items = [
  {
    title: "Babosa (Aloe vera)",
    body:
      "Atua como um 'reservatório de água', devolvendo a umidade e auxiliando na renovação celular rápida. Rica em polissacarídeos e acemanana, que estimula o colágeno.",
  },
  {
    title: "Camomila (Matricaria chamomilla)",
    body:
      "Contém alfa-bisabolol e camazuleno que 'avisam' a pele para relaxar, diminuindo inchaço e vermelhidão.",
  },
  {
    title: "Sinergia",
    body:
      "A combinação promove proteção da barreira cutânea contra o estresse oxidativo, com ação calmante e regeneradora.",
  },
];

export function Ingredients() {
  return (
    <section id="ingredientes" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-[--leaf]">Ingredientes</span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Da natureza, para a sua pele
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] bg-secondary/50 p-6">
            <img src={botanical} alt="Ilustração botânica de camomila e aloe vera" loading="lazy" width={1024} height={768} className="w-full rounded-2xl" />
          </div>

          <div className="space-y-5">
            {items.map((it) => (
              <div key={it.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
                <h3 className="font-display text-xl font-semibold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
