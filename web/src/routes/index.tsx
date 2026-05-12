import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/sections/Hero";
import { Ingredients } from "@/sections/Ingredients";
import { Science } from "@/sections/Science";
import { Testimonials } from "@/sections/Testimonials";
import { About } from "@/sections/About";
import { FAQ } from "@/sections/FAQ";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Smooth scroll on initial hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);

  return (
    <>
      <Hero />
      <Ingredients />
      <Science />
      <Testimonials />
      <About />
      <FAQ />
    </>
  );
}
