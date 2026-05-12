import { Link } from "@tanstack/react-router";
import logo from "@/assets/calmavera-logo.png";

export function Logo({ className = "", variant = "full" }: { className?: string; variant?: "full" | "mark" }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="Calmavera">
      <img
        src={logo}
        alt="Calmavera — Camomila & Aloe Vera"
        width={variant === "mark" ? 56 : 160}
        height={variant === "mark" ? 56 : 56}
        className={
          variant === "mark"
            ? "h-12 w-12 rounded-full object-cover"
            : "h-12 w-auto object-contain mix-blend-multiply"
        }
      />
    </Link>
  );
}
