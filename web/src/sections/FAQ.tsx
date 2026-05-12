import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "O que é o Calmavera?", a: "Um creme medicinal caseiro feito com ingredientes naturais (Babosa e Camomila)." },
  { q: "Para que serve?", a: "Hidratação profunda, recuperação de queimaduras leves, acne e alívio de coceiras." },
  { q: "Como usar?", a: "Aplicar camada fina na pele limpa, 2 a 3 vezes ao dia, massageando até sumir na pele." },
  { q: "Quem não pode usar?", a: "Contraindicado para crianças, gestantes e lactantes." },
  { q: "Como guardar?", a: "Local fresco e longe do sol para preservar as propriedades das plantas." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[--leaf]">FAQ</span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Perguntas frequentes
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-soft">
              <AccordionTrigger className="py-5 text-left font-display text-lg font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
