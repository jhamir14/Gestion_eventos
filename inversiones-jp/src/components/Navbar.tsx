'use client';

import Link from 'next/link';
import { Heart, Menu, Phone } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Navbar() {
    const wishlist = useStore((state) => state.wishlist);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-secondary/20 bg-primary text-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight text-secondary hover:text-secondary-light transition-colors">
                    Inversiones JP
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="hover:text-secondary-light transition-colors">
                        Catálogo
                    </Link>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="https://wa.me/" target="_blank" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-secondary">
                        <Phone className="h-4 w-4" />
                        Contacto
                    </Link>

                    <div className="relative">
                        <Heart className="h-6 w-6 text-secondary" />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                {wishlist.length}
                            </span>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="border-t border-gray-700 bg-primary md:hidden">
                    <div className="flex flex-col space-y-4 p-4">
                        <Link href="/" className="text-sm font-medium hover:text-secondary" onClick={() => setIsMenuOpen(false)}>
                            Catálogo
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
}
