'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore, Product } from '@/store/useStore';
import { calculateCreditPlan } from '@/lib/creditCalculator';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Calculator,
  Sparkles,
  MessageCircle,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Tag
} from 'lucide-react';

interface CreditSimulatorProps {
  initialProductId?: string;
}

export default function CreditSimulator({ initialProductId }: CreditSimulatorProps) {
  const { products } = useStore();

  // Find initial product or fallback to first available
  const defaultProduct = useMemo(() => {
    if (initialProductId) {
      const found = products.find((p) => p.id === initialProductId);
      if (found) return found;
    }
    return products.find((p) => p.id === 'samsung-a56-5g-256') || products[0] || null;
  }, [initialProductId, products]);

  const [selectedProductId, setSelectedProductId] = useState<string>(defaultProduct?.id || '');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || defaultProduct;
  }, [selectedProductId, products, defaultProduct]);

  const currentPrice = selectedProduct ? selectedProduct.priceCash : 1000;

  // Minimum initial payment is strictly 100 soles
  const MIN_INITIAL = 100;

  // Initial and weeks state
  const [initialPayment, setInitialPayment] = useState<number>(() => {
    if (selectedProduct) {
      return Math.max(MIN_INITIAL, selectedProduct.initialPayment || MIN_INITIAL);
    }
    return MIN_INITIAL;
  });

  const [weeks, setWeeks] = useState<number>(() => {
    if (selectedProduct) {
      return selectedProduct.weeks || 12;
    }
    return 12;
  });

  // When selectedProduct changes, update defaults
  useEffect(() => {
    if (selectedProduct) {
      setInitialPayment(Math.max(MIN_INITIAL, selectedProduct.initialPayment || MIN_INITIAL));
      setWeeks(selectedProduct.weeks || (selectedProduct.brand === 'Apple' ? 30 : 12));
    }
  }, [selectedProduct]);

  // Perform calculation (interest calculated internally, never displayed)
  const plan = useMemo(() => {
    return calculateCreditPlan(currentPrice, initialPayment, weeks);
  }, [currentPrice, initialPayment, weeks]);

  // Week options tailored to device category
  const isApple = selectedProduct?.brand === 'Apple' || currentPrice > 2000;
  const weekOptions = isApple
    ? [16, 24, 30, 32, 36, 38]
    : [8, 12, 16, 20, 24];

  // Quick initial options starting strictly from S/ 100
  const maxInitial = Math.max(MIN_INITIAL + 50, Math.round(currentPrice * 0.6));
  const quickInitials = isApple
    ? [100, 200, 300, 500]
    : currentPrice > 1500
    ? [100, 150, 200, 300]
    : [100, 120, 150, 200];

  // WhatsApp Message (No interest rates, only transparent numbers)
  const whatsappMessage = selectedProduct
    ? `Hola Inversiones JP, acabo de simular mi crédito en la web para el ${selectedProduct.brand} ${selectedProduct.model}:
- Precio al contado: ${formatCurrency(selectedProduct.priceCash)}
- Mi pago inicial: ${formatCurrency(plan.initialPayment)}
- Cuota semanal: ${formatCurrency(plan.weeklyPayment)}
- Plazo: ${plan.weeks} semanas
¡Deseo iniciar la evaluación para mi crédito y entrega inmediata!`
    : 'Hola Inversiones JP, deseo información sobre el financiamiento de celulares.';

  const whatsappLink = `https://wa.me/51920694641?text=${encodeURIComponent(whatsappMessage)}`;

  if (!selectedProduct) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>Cargando información del equipo...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Top Header bar with clean return navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <Calculator className="h-4 w-4 text-cyan-400" />
            Simulador de Cuotas Semanales
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Simula tu Plan para el <span className="text-cyan-400">{selectedProduct.model}</span>
          </h1>
        </div>

        {/* Change device dropdown toggle */}
        <div className="relative">
          <button
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-700/80 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          >
            <Smartphone className="h-4 w-4 text-cyan-400" />
            <span>Cambiar celular</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isSelectorOpen && "rotate-180")} />
          </button>

          {isSelectorOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-h-96 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl z-30 space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 px-3 py-1.5 block">
                Selecciona otro equipo del catálogo:
              </span>
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setIsSelectorOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition-all",
                    selectedProduct.id === p.id
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  )}
                >
                  <span className="truncate">{p.model}</span>
                  <span className="text-slate-400 text-[11px] ml-2 font-black">{formatCurrency(p.priceCash)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Simulator Card Grid: Only this device is featured */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Device Showcase & Cash Price */}
        <div className="lg:col-span-5 space-y-5 rounded-3xl border border-slate-800 bg-slate-900/95 p-5 sm:p-7 shadow-2xl">
          {/* Phone Display Canvas */}
          <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-white via-white to-slate-50 p-6 overflow-hidden flex items-center justify-center border border-slate-700/60 shadow-inner">
            <Image
              src={selectedProduct.image || '/placeholder-phone.png'}
              alt={selectedProduct.model}
              fill
              priority
              className="object-contain p-2"
            />
          </div>

          {/* Device Info */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                {selectedProduct.brand}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {selectedProduct.model}
              </h2>
            </div>

            {/* Specs Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-slate-200 font-bold border border-slate-700">
                RAM: {selectedProduct.specifications?.ram || 'RAM'}
              </span>
              <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-slate-200 font-bold border border-slate-700">
                Almacenamiento: {selectedProduct.specifications?.storage || 'ROM'}
              </span>
              {selectedProduct.specifications?.network && (
                <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-cyan-300 font-bold border border-cyan-400/30">
                  {selectedProduct.specifications.network}
                </span>
              )}
            </div>

            {/* CASH PRICE CARD (Highlighted prominently as requested) */}
            <div className="mt-4 rounded-2xl bg-slate-950 p-4 border border-slate-800 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-2 text-slate-300">
                <Tag className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Precio al Contado:</span>
              </div>
              <span className="text-2xl font-black text-white">
                {formatCurrency(selectedProduct.priceCash)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls & Result */}
        <div className="lg:col-span-7 space-y-5 rounded-3xl border border-slate-800 bg-slate-900/95 p-5 sm:p-7 shadow-2xl">
          {/* Initial Payment Control (Minimum S/ 100) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                  Pago Inicial (Mínimo S/ 100):
                </label>
                <span className="text-[11px] text-slate-400">
                  Puedes dar desde S/ 100 de inicial. A mayor inicial, menor es tu cuota semanal.
                </span>
              </div>
              <span className="text-xl font-black text-white bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
                {formatCurrency(initialPayment)}
              </span>
            </div>

            <input
              type="range"
              min={MIN_INITIAL}
              max={maxInitial}
              step="10"
              value={initialPayment}
              onChange={(e) => setInitialPayment(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />

            {/* Quick Initial Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Opciones rápidas:</span>
              {quickInitials.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setInitialPayment(amt)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-bold transition-all border cursor-pointer",
                    initialPayment === amt
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 ring-1 ring-cyan-400 shadow-sm"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                  )}
                >
                  S/ {amt} {amt === MIN_INITIAL && '(Mínima)'}
                </button>
              ))}
            </div>
          </div>

          {/* Weeks Selection Control */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                  Plazo en Semanas:
                </label>
                <span className="text-[11px] text-slate-400">
                  Equivalente a {(weeks / 4).toFixed(1)} meses aprox.
                </span>
              </div>
              <span className="text-sm font-black text-cyan-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                {weeks} semanas
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {weekOptions.map((w) => {
                const isSelected = weeks === w;
                const isRecommended = (isApple && w === 30) || (!isApple && w === 12);
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeeks(w)}
                    className={cn(
                      "relative rounded-xl p-2.5 text-center transition-all border cursor-pointer flex flex-col items-center justify-center",
                      isSelected
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white border-cyan-300 shadow-lg shadow-cyan-500/30 scale-102"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
                    )}
                  >
                    {isRecommended && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-1.5 py-0.2 text-[8px] font-black uppercase text-slate-950">
                        Ideal
                      </span>
                    )}
                    <span className="text-sm font-black">{w}</span>
                    <span className="text-[10px] font-medium opacity-80">sem</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Box (NO interest displayed, completely transparent on payments) */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-950 to-slate-950/90 p-5 sm:p-6 shadow-inner space-y-4">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-extrabold block">
                Tu Cuota Semanal Fija
              </span>
              <div className="my-2 flex items-baseline justify-center gap-1">
                <span className="text-4xl sm:text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]">
                  {formatCurrency(plan.weeklyPayment)}
                </span>
                <span className="text-sm font-bold text-slate-400">/ semana</span>
              </div>
              <span className="inline-block rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-300 border border-cyan-400/30">
                x {plan.weeks} cuotas semanales
              </span>
            </div>

            {/* Breakdown (NO interest rates or percentages) */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between py-1 text-slate-300">
                <span className="font-semibold text-slate-400">Pago Inicial a entregar:</span>
                <span className="font-black text-white">{formatCurrency(plan.initialPayment)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300">
                <span className="font-semibold text-slate-400">Total a pagar en cuotas:</span>
                <span className="font-black text-white">{formatCurrency(plan.totalFinanced)}</span>
              </div>
            </div>

            {/* Inversiones JP Recommendation Box */}
            <div className="rounded-xl bg-cyan-500/10 border border-cyan-400/25 p-3.5 text-xs text-slate-200 flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {plan.recommendation}
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-black text-white shadow-lg shadow-green-500/25 transition-all hover:bg-[#20bd5a] hover:shadow-green-500/40 active:scale-98 text-sm sm:text-base cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar este Plan por WhatsApp
            </a>

            <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Sin trámites bancarios
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" /> Entrega inmediata
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
