import Link from "next/link";
import { Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VendorsPage() {
  return (
    <div className="pt-32 pb-24 max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 min-h-[70vh] flex flex-col justify-center items-start">
      <div className="inline-flex items-center gap-2 bg-ink/5 px-3 py-1.5 border border-ink/10 mb-6">
        <Store className="w-4 h-4 text-gold" />
        <span className="text-xs font-headline uppercase tracking-widest text-ink/70">
          Module Preview • Phase 3
        </span>
      </div>

      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-headline uppercase text-ink tracking-tight leading-tighter max-w-3xl">
        CURATED VENDOR MARKETPLACE
      </h1>

      <p className="text-base sm:text-lg text-ink/70 font-body max-w-xl mt-4 mb-8 leading-relaxed">
        Category exclusivity guaranteed via atomic Postgres capacity locks. Food trucks, athletic apparel, artisan goods, and media services.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="primary">
          <Link href="/join">Notify When Applications Open</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
