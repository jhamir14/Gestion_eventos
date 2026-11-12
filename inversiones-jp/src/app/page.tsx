import { Suspense } from 'react';
import CatalogList from '@/components/CatalogList';
import FilterBar from '@/components/FilterBar';
import { ShieldCheck, Zap, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* High-Tech Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/25 bg-gradient-to-r from-slate-900/90 via-slate-950/95 to-blue-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Financiamiento Rápido · Cuotas Semanales
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Tecnología Móvil <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-200">a tu Alcance</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Descubre los mejores smartphones con planes de financiamiento a tu medida. Llévate tu equipo hoy mismo con cuotas semanales fijas y entrega inmediata.
          </p>

          {/* Quick Value Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-cyan-300">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Planes en 12 Semanas</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-blue-300">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              <span>Garantía Oficial</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-emerald-300">
              <Truck className="h-4 w-4 text-emerald-400" />
              <span>Envío y Entrega Rápida</span>
            </div>
          </div>
        </div>

        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 right-1/4 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl"></div>
      </div>

      {/* Filter and Catalog */}
      <div className="space-y-4">
        <Suspense fallback={<div className="text-slate-400 text-center py-4 font-medium">Cargando filtros de marcas...</div>}>
          <FilterBar />
        </Suspense>

        <Suspense fallback={<div className="text-slate-400 text-center py-10 font-medium">Cargando catálogo tecnológico...</div>}>
          <CatalogList />
        </Suspense>
      </div>
    </div>
  );
}
