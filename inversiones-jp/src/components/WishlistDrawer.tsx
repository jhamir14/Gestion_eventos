'use client';

import { useStore, Product } from '@/store/useStore';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, MessageCircle, Heart, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
    const { wishlist, toggleWishlist } = useStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Slide-over panel */}
            <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-slate-950 border-l border-slate-800 text-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/90">
                    <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        <h2 className="text-lg font-black tracking-tight text-white">
                            Mis Favoritos ({wishlist.length})
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        aria-label="Cerrar favoritos"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 mb-3 text-cyan-400">
                                <Heart className="h-10 w-10" />
                            </div>
                            <h3 className="text-base font-bold text-white">Aún no tienes favoritos</h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                                Haz clic en el corazón de cualquier celular para guardarlo aquí y cotizarlo directamente por WhatsApp.
                            </p>
                        </div>
                    ) : (
                        wishlist.map((item) => {
                            const whatsappMsg = `Hola Inversiones JP, tengo en mis favoritos el ${item.brand} ${item.model} (Inicial: ${formatCurrency(item.initialPayment)} / Cuota: ${formatCurrency(item.weeklyPayment)} semanal). ¿Está disponible?`;
                            const waLink = `https://wa.me/51920694641?text=${encodeURIComponent(whatsappMsg)}`;

                            return (
                                <div
                                    key={item.id}
                                    className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-3 shadow-md transition-all hover:border-cyan-500/50"
                                >
                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-white border border-slate-700/60 p-1">
                                        <Image
                                            src={item.image || '/placeholder-phone.png'}
                                            alt={item.model}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-1">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                                                        {item.brand}
                                                    </span>
                                                    <h4 className="text-sm font-black text-white leading-tight">
                                                        {item.model}
                                                    </h4>
                                                </div>
                                                <button
                                                    onClick={() => toggleWishlist(item)}
                                                    className="text-slate-500 hover:text-red-400 p-1"
                                                    title="Eliminar de favoritos"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="mt-1 flex items-baseline gap-2">
                                                <span className="text-xs font-black text-cyan-400">
                                                    {formatCurrency(item.weeklyPayment)} / sem
                                                </span>
                                                <span className="text-[10px] font-semibold text-slate-400">
                                                    (Ini: {formatCurrency(item.initialPayment)})
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-2 flex items-center gap-2 pt-1.5 border-t border-slate-800">
                                            <Link
                                                href={`/product/${item.id}`}
                                                onClick={onClose}
                                                className="text-[11px] font-bold text-slate-300 hover:text-cyan-400 transition-colors inline-flex items-center gap-0.5"
                                            >
                                                Detalles <ArrowRight className="h-3 w-3" />
                                            </Link>
                                            <a
                                                href={waLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-auto inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-3 py-1 text-[11px] font-black text-white hover:bg-[#20bd5a] shadow-sm"
                                            >
                                                <MessageCircle className="h-3 w-3" /> Cotizar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {wishlist.length > 0 && (
                    <div className="border-t border-slate-800 bg-slate-900/80 p-4">
                        <Link
                            href="/"
                            onClick={onClose}
                            className="block w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-center text-xs font-extrabold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-400"
                        >
                            Seguir explorando catálogo
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
