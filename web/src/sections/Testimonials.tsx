import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { avaliacaoApi } from "@/lib/api";

type Review = { name: string; rating: number; comment: string; date: string };

const seed: Review[] = [
  { name: "Mariana S.", rating: 5, comment: "Amei o Calmavera! Minha pele estava descamando por causa do sol e o alívio foi imediato. Recomendo muito!", date: "12/03/2026" },
  { name: "Lucas R.", rating: 4, comment: "Uso para acalmar a vermelhidão da acne e funciona super bem. Textura muito agradável.", date: "02/04/2026" },
  { name: "Beatriz M.", rating: 5, comment: "Melhor hidratante natural que já usei. O cheirinho de camomila é uma delícia.", date: "18/04/2026" },
];

const KEY = "calmavera:reviews";

function Stars({ value, size = 16, onChange }: { value: number; size?: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          disabled={!onChange}
          className={onChange ? "transition-transform hover:scale-110" : ""}
        >
          <Star
            size={size}
            className={n <= value ? "fill-[oklch(0.85_0.15_85)] text-[oklch(0.85_0.15_85)]" : "text-muted-foreground/40"}
          />
        </button>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>(seed);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    avaliacaoApi
      .listar()
      .then((list) => {
        const mapped: Review[] = list.map((a) => ({
          name: a.nome_usuario ?? `Usuário #${a.id_usuario}`,
          rating: a.estrelas,
          comment: a.comentario,
          date: a.data
            ? new Date(a.data).toLocaleDateString("pt-BR")
            : new Date().toLocaleDateString("pt-BR"),
        }));
        if (mapped.length) setReviews([...mapped, ...seed]);
      })
      .catch(() => {
        try {
          const raw = localStorage.getItem(KEY);
          if (raw) {
            const stored = JSON.parse(raw) as Review[];
            if (Array.isArray(stored) && stored.length) setReviews([...stored, ...seed]);
          }
        } catch {}
      });
  }, []);

  const handleOpen = () => {
    if (!isAuthenticated) {
      toast.info("Faça login para deixar sua avaliação");
      navigate({ to: "/login", search: {} });
      return;
    }
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Escreva um comentário");
      return;
    }
    if (!user?.id) {
      toast.error("Faça login novamente");
      return;
    }
    try {
      await avaliacaoApi.criar({
        id_usuario: user.id,
        id_produto: 1,
        estrelas: rating,
        comentario: comment.trim(),
      });
    } catch (e) {
      toast.error((e as Error).message);
      return;
    }
    const newReview: Review = {
      name: user.name,
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("pt-BR"),
    };
    setReviews([newReview, ...reviews]);
    setOpen(false);
    setComment("");
    setRating(5);
    toast.success("Obrigado pela sua avaliação!");
  };

  return (
    <section id="depoimentos" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-widest text-[--leaf]">Depoimentos</span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Quem usa, recomenda
          </h2>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {reviews.map((r, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div>
                    <Stars value={r.rating} />
                    <p className="mt-4 leading-relaxed text-foreground">"{r.comment}"</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-medium text-foreground">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

        <div className="mt-10 text-center">
          <Button size="lg" onClick={handleOpen} className="bg-primary hover:bg-primary/90">
            Deixar minha avaliação
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Sua avaliação</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Sua nota</Label>
              <div className="mt-2"><Stars value={rating} size={28} onChange={setRating} /></div>
            </div>
            <div>
              <Label htmlFor="r-comment">Comentário</Label>
              <Textarea id="r-comment" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Conte sua experiência com o Calmavera..." />
            </div>
            <Button type="submit" className="w-full">Enviar avaliação</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
