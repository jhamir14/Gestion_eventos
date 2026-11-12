'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Menu, Phone } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import WishlistDrawer from './WishlistDrawer';

export default function Navbar() {
    const wishlist = useStore((state) => state.wishlist);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 text-white shadow-2xl backdrop-blur-xl">
                <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 max-w-7xl">
                    {/* Logo with Brand Image */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-11 w-16 sm:h-13 sm:w-20 overflow-hidden rounded-xl bg-white p-1 shadow-md shadow-cyan-500/10 border border-cyan-400/30 transition-transform group-hover:scale-105">
                            <Image
                                src="/logo.jpg"
                                alt="Logo Inversiones JP"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                        <div className="hidden xs:flex flex-col">
                            <span className="text-lg sm:text-xl font-black tracking-tight leading-none text-white">
                                INVERSIONES <span className="text-cyan-400">JP</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                                Tienda Móvil
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                            Catálogo
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link
                            href="https://wa.me/51920694641?text=Hola%20Inversiones%20JP,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20equipos"
                            target="_blank"
                            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:border-cyan-400"
                        >
                            <Phone className="h-3.5 w-3.5 text-cyan-400" />
                            Contacto WhatsApp
                        </Link>

                        <button
                            onClick={() => setIsWishlistOpen(true)}
                            className="relative rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800"
                            title="Ver Favoritos"
                            aria-label="Abrir lista de favoritos"
                        >
                            <Heart className={cn("h-5 w-5", wishlist.length > 0 ? "fill-red-500 text-red-500" : "text-slate-300")} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-[10px] font-black text-white shadow-sm">
                                    {wishlist.length}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 text-slate-300 hover:bg-slate-800"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Abrir menú"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="border-t border-slate-800 bg-slate-950 p-4 md:hidden space-y-3">
                        <Link
                            href="/"
                            className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Catálogo Completo
                        </Link>
                        <Link
                            href="https://wa.me/51920694641?text=Hola%20Inversiones%20JP,%20quisiera%20m%C3%A1s%20informaci%C3%B3n"
                            target="_blank"
                            className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 px-3 py-2.5 text-sm font-bold text-cyan-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Phone className="h-4 w-4 text-cyan-400" />
                            Contacto WhatsApp
                        </Link>
                    </div>
                )}
            </nav>

            {/* Wishlist slide-over drawer */}
            <WishlistDrawer
                isOpen={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
            />
        </>
    );
}
