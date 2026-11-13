'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore, Product } from '@/store/useStore';
import { calculateCreditPlan, getCreditTier } from '@/lib/creditCalculator';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Calculator,
  Sparkles,
  MessageCircle,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface CreditSimulatorProps {
  initialProductId?: string;
  showTitle?: boolean;
}

export default function CreditSimulator({ initialProductId, showTitle = true }: CreditSimulatorProps) {
  const { products } = useStore();

  // Find initial product or fallback to a popular default
  const defaultProduct = useMemo(() => {
    if (initialProductId) {
      const found = products.find((p) => p.id === initialProductId);
      if (found) return found;
    }
    return products.find((p) => p.id === 'samsung-a56-5g-256') || products[0] || null;
  }, [initialProductId, products]);

  const [mode, setMode] = useState<'catalog' | 'custom'>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<string>(defaultProduct?.id || '');
  const [customPrice, setCustomPrice] = useState<number>(1200);

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || defaultProduct;
  }, [selectedProductId, products, defaultProduct]);

  // Active price based on mode
  const currentPrice = mode === 'catalog' && selectedProduct ? selectedProduct.priceCash : customPrice;

  // Tier info for initial recommendations
  const activeTier = getCreditTier(currentPrice);

  // Initial and weeks state
  const [initialPayment, setInitialPayment] = useState<number>(
    selectedProduct?.initialPayment || activeTier.recommendedInitial
  );
  const [weeks, setWeeks] = useState<number>(
    selectedProduct?.weeks || activeTier.defaultWeeks
  );

  // Update defaults when switching product
  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    const prod = products.find((p) => p.id === id);
    if (prod) {
      setInitialPayment(prod.initialPayment);
      setWeeks(prod.weeks);
    }
  };

  // Perform calculation
  const plan = useMemo(() => {
    return calculateCreditPlan(currentPrice, initialPayment, weeks);
  }, [currentPrice, initialPayment, weeks]);

  // Preset week options based on price
  const weekOptions = currentPrice > 2000
    ? [16, 24, 30, 32, 36, 38]
    : [8, 12, 16, 20, 24];

  // Quick initial options
  const quickInitials = currentPrice > 2000
    ? [300, 400, 500, 700]
    : currentPrice > 1500
    ? [150, 200, 250, 350]
    : [100, 120, 150, 200];

  // WhatsApp Message
  const phoneName = mode === 'catalog' && selectedProduct
    ? `${selectedProduct.brand} ${selectedProduct.model}`
    : `Equipo de S/ ${currentPrice}`;

  const whatsappMessage = `Hola Inversiones JP, acabo de realizar una simulación en la web para el ${phoneName}:
- Precio referencial: ${formatCurrency(currentPrice)}
- Pago Inicial: ${formatCurrency(plan.initialPayment)}
- Cuota Semanal: ${formatCurrency(plan.weeklyPayment)}
- Plazo: ${plan.weeks} semanas
- Tasa aplicada: ${plan.monthlyRatePercent}% mensual
¡Deseo iniciar la evaluación para mi crédito y entrega inmediata!`;

  const whatsappLink = `https://wa.me/51920694641?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full space-y-6">
      {showTitle && (
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Calculator className="h-4 w-4 text-cyan-400" />
              Simulador Interactivo de Crédito Inversiones JP
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Calcula tus Cuotas con nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-200">Nueva Escala de Tasas</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Descubre cuotas cómodas con nuestra tarifa escalonada: <span className="text-emerald-400 font-bold">15%</span> para gama económica, <span className="text-cyan-400 font-bold">10%</span> para gama media, <span className="text-blue-400 font-bold">7.5%</span> para gama media-alta y <span className="text-purple-400 font-bold">5% exclusivo</span> para iPhones.
            </p>
          </div>
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"></div>
        </div>
      )}

      {/* Simulator Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-7 shadow-xl">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setMode('catalog')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-bold transition-all",
                mode === 'catalog'
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <Smartphone className="h-4 w-4" />
              Elegir de Catálogo
            </button>
            <button
              onClick={() => setMode('custom')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-bold transition-all",
                mode === 'custom'
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <DollarSign className="h-4 w-4" />
              Monto Personalizado
            </button>
          </div>

          {/* Catalog Mode Selection */}
          {mode === 'catalog' ? (
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                Selecciona el Celular a Financiar:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                {products.map((p) => {
                  const isSelected = selectedProduct?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl p-2.5 text-left transition-all border cursor-pointer",
                        isSelected
                          ? "bg-slate-800 border-cyan-400 ring-1 ring-cyan-400 shadow-md shadow-cyan-500/20"
                          : "bg-slate-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
                      )}
                    >
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-white p-1">
                        <Image
                          src={p.image || '/placeholder-phone.png'}
                          alt={p.model}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-extrabold uppercase text-cyan-400 block">
                          {p.brand}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-white truncate">
                          {p.model}
                        </h4>
                        <span className="text-xs font-extrabold text-slate-300">
                          {formatCurrency(p.priceCash)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Precio de Referencia del Celular:
                </label>
                <span className="text-lg font-black text-cyan-400">
                  {formatCurrency(customPrice)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="6000"
                step="50"
                value={customPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCustomPrice(val);
                  const t = getCreditTier(val);
                  if (initialPayment > val * 0.5) setInitialPayment(t.recommendedInitial);
                }}
                className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>S/ 500 (Económico)</span>
                <span>S/ 2,500 (Gama Alta)</span>
                <span>S/ 6,000 (iPhone Pro Max)</span>
              </div>
            </div>
          )}

          {/* Initial Payment Control */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                  Tu Pago Inicial:
                </label>
                <span className="text-[11px] text-slate-400">
                  A mayor inicial, tu cuota semanal se reduce.
                </span>
              </div>
              <span className="text-xl font-black text-white bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
                {formatCurrency(initialPayment)}
              </span>
            </div>

            <input
              type="range"
              min="50"
              max={Math.min(2500, Math.round(currentPrice * 0.6))}
              step="10"
              value={initialPayment}
              onChange={(e) => setInitialPayment(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />

            {/* Quick Initial Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Sugeridos:</span>
              {quickInitials.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setInitialPayment(amt)}
                  className={cn(
                    "rounded-lg px-3 py-1 text-xs font-bold transition-all border cursor-pointer",
                    initialPayment === amt
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400"
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                  )}
                >
                  S/ {amt}
                </button>
              ))}
            </div>
          </div>

          {/* Weeks Selector */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                  Plazo en Semanas:
                </label>
                <span className="text-[11px] text-slate-400">
                  Equivalente a {(weeks / 4).toFixed(1)} meses aprox.
                </span>
              </div>
              <span className="text-base font-black text-cyan-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                {weeks} semanas
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {weekOptions.map((w) => {
                const isSelected = weeks === w;
                const isRecommended = (currentPrice > 2000 && w === 30) || (currentPrice <= 2000 && w === 12);
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeeks(w)}
                    className={cn(
                      "relative rounded-xl p-2.5 text-center transition-all border cursor-pointer flex flex-col items-center justify-center",
                      isSelected
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-300 shadow-md shadow-cyan-500/30 scale-102"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
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
        </div>

        {/* Right Column: Holographic Results Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 p-6 sm:p-7 shadow-2xl ring-1 ring-cyan-500/20 space-y-6">
            {/* Header: Applied Tier Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Plan Calculado
              </span>
              <div className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black border", plan.tier.badgeColor)}>
                <Sparkles className="h-3.5 w-3.5" />
                <span>{plan.tier.badge}</span>
              </div>
            </div>

            {/* Selected Device Preview in Result */}
            {mode === 'catalog' && selectedProduct && (
              <div className="flex items-center gap-3.5 rounded-2xl bg-slate-950/80 p-3 border border-slate-800/80">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white p-1">
                  <Image
                    src={selectedProduct.image || '/placeholder-phone.png'}
                    alt={selectedProduct.model}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-cyan-400">
                    {selectedProduct.brand}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                    {selectedProduct.model}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {selectedProduct.specifications?.ram} / {selectedProduct.specifications?.storage}
                  </span>
                </div>
              </div>
            )}

            {/* Huge Weekly Payment Display */}
            <div className="text-center rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900/90 p-5 border border-slate-800 shadow-inner">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-extrabold block">
                Tu Cuota Semanal Estimada
              </span>
              <div className="my-2 flex items-baseline justify-center gap-1">
                <span className="text-4xl sm:text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]">
                  {formatCurrency(plan.weeklyPayment)}
                </span>
                <span className="text-sm font-bold text-slate-400">/ sem</span>
              </div>
              <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs font-bold text-cyan-300">
                Fijas durante {plan.weeks} semanas
              </span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/70 text-slate-300">
                <span className="font-semibold text-slate-400">Pago Inicial Requerido:</span>
                <span className="font-black text-white">{formatCurrency(plan.initialPayment)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/70 text-slate-300">
                <span className="font-semibold text-slate-400">Saldo a Financiar:</span>
                <span className="font-bold text-slate-200">{formatCurrency(plan.balance)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/70 text-slate-300">
                <span className="font-semibold text-slate-400">Tasa de Interés:</span>
                <span className="font-black text-cyan-400">{plan.monthlyRatePercent}% mensual</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/70 text-slate-300">
                <span className="font-semibold text-slate-400">Total a Pagar en Cuotas:</span>
                <span className="font-black text-white">{formatCurrency(plan.totalFinanced)}</span>
              </div>
            </div>

            {/* Smart Inversiones JP Recommendation Box */}
            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-400/25 p-4 text-xs text-slate-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-black text-cyan-300">
                <Sparkles className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>Recomendación Inversiones JP:</span>
              </div>
              <p className="leading-relaxed text-slate-300">
                {plan.recommendation}
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-black text-white shadow-lg shadow-green-500/25 transition-all hover:bg-[#20bd5a] hover:shadow-green-500/40 active:scale-98 text-sm sm:text-base cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar este Crédito por WhatsApp
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
