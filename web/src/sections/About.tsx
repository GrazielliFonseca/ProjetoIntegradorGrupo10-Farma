export function About() {
  return (
    <section id="quem-somos" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <span className="text-sm font-medium uppercase tracking-widest text-[--leaf]">Quem Somos</span>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          A história por trás da Calmavera
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-left text-lg leading-relaxed text-muted-foreground md:text-center">
          <p>
            Somos do <strong className="text-foreground">Grupo Calmavera</strong>, do curso técnico de
            Farmácia, dirigido pela professora <strong className="text-foreground">Denise Campos</strong>.
          </p>
          <p>
            A Calmavera nasceu com o propósito de oferecer uma alternativa terapêutica
            <em> segura, acessível e natural</em> — tratando a pele como um órgão vital de proteção.
          </p>
          <p>
            Cada frasco é fruto de estudos de estabilidade físico-química e controle de qualidade.
            Acreditamos que a saúde da pele é essencial e democrática. Por isso, trabalhamos neste
            produto visando o conforto e a autoestima dos nossos usuários.
          </p>
        </div>
      </div>
    </section>
  );
}
