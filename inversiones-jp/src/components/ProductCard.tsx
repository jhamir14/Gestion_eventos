'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight, Calculator, Tag } from 'lucide-react';
import { Product, useStore } from '@/store/useStore';
import { cn, formatCurrency } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { wishlist, toggleWishlist } = useStore();
    const isWishlisted = wishlist.some((p) => p.id === product.id);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/15">
            {/* Image Canvas Container - Studio Display */}
            <div className="relative aspect-square w-full bg-gradient-to-b from-white via-white to-slate-50 p-4 overflow-hidden rounded-t-2xl flex items-center justify-center border-b border-slate-800/80">
                <Image
                    src={product.image || '/placeholder-phone.png'}
                    alt={product.model}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    className="absolute right-2.5 top-2.5 z-10 rounded-full bg-slate-950/75 p-2 text-slate-300 backdrop-blur-md transition-all hover:bg-slate-950 hover:text-red-400 active:scale-90 shadow-md"
                    aria-label="Agregar a favoritos"
                >
                    <Heart className={cn("h-4 w-4 sm:h-5 sm:w-5", isWishlisted && "fill-red-500 text-red-500")} />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                <div>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-cyan-400 block">
                        {product.brand}
                    </span>
                    <h3 className="line-clamp-2 h-10 sm:h-12 text-sm sm:text-base font-black text-white leading-snug mt-1 group-hover:text-cyan-300 transition-colors">
                        {product.model}
                    </h3>

                    {/* Quick Specs Pill */}
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-slate-200 border border-slate-700/60">
                        <span className="text-white font-bold">{product.specifications?.ram || 'RAM'}</span>
                        <span className="text-slate-500">/</span>
                        <span className="text-white font-bold">{product.specifications?.storage || 'ROM'}</span>
                        {product.specifications?.network && (
                            <>
                                <span className="text-slate-500">•</span>
                                <span className="text-cyan-300 font-extrabold">{product.specifications.network}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Financing Plan Box */}
                <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-slate-800/90 bg-slate-950/90 p-2.5 sm:p-3 shadow-inner">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 text-xs">
                            <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                                <Tag className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                                Precio al Contado
                            </span>
                            <span className="font-black text-slate-100 text-xs sm:text-sm">
                                {formatCurrency(product.priceCash)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80 text-xs">
                            <span className="font-semibold text-slate-400">Pago Inicial</span>
                            <span className="font-black text-white text-xs sm:text-sm">{formatCurrency(product.initialPayment)}</span>
                        </div>
                        <div className="flex items-baseline justify-between pt-1.5">
                            <div>
                                <span className="text-[11px] sm:text-xs font-bold text-slate-200 block">Cuota Semanal</span>
                                <span className="text-[10px] text-cyan-400/90 font-medium">x {product.weeks || 12} semanas</span>
                            </div>
                            <span className="text-lg sm:text-xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.25)]">
                                {formatCurrency(product.weeklyPayment)}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href={`/simulador?phone=${product.id}`}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-950/80 border border-slate-700/80 py-2.5 text-center text-xs font-bold text-slate-300 transition-all hover:bg-slate-900 hover:text-cyan-300 hover:border-cyan-400/50"
                        >
                            <Calculator className="h-3.5 w-3.5 text-cyan-400" />
                            Simular
                        </Link>

                        <Link
                            href={`/product/${product.id}`}
                            className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-2.5 text-center text-xs sm:text-sm font-black text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.98]"
                        >
                            Detalles <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
