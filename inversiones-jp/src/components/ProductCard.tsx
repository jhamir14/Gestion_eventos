'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product, useStore } from '@/store/useStore';
import { cn, formatCurrency } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { wishlist, toggleWishlist } = useStore();
    const isWishlisted = wishlist.some((p) => p.id === product.id);

    return (
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
            {/* Image Container */}
            <div className="aspect-[4/3] w-full relative bg-gray-100">
                <Image
                    src={product.image || '/placeholder-phone.png'}
                    alt={product.model}
                    fill
                    className="object-contain p-2 sm:p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full bg-white/80 p-1.5 sm:p-2 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500"
                >
                    <Heart className={cn("h-4 w-4 sm:h-5 sm:w-5", isWishlisted && "fill-current text-red-500")} />
                </button>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
                <div className="mb-2">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {product.brand}
                    </span>
                    <h3 className="truncate text-sm sm:text-lg font-bold text-gray-900 leading-tight">{product.model}</h3>
                </div>

                {/* Pricing */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    <div className='flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2'>
                        <span className="text-xs sm:text-sm text-gray-500">Contado:</span>
                        <span className="text-sm sm:text-lg font-bold text-primary">{formatCurrency(product.priceCash)}</span>
                    </div>

                    <div className="rounded-lg bg-surface p-2 sm:p-3 border border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] sm:text-xs font-medium text-gray-600">Inicial</span>
                            <span className="text-xs sm:text-sm font-bold text-secondary-light">{formatCurrency(product.initialPayment)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] sm:text-xs font-medium text-gray-600">Semanal</span>
                            <div className="text-right">
                                <span className="block text-xs sm:text-sm font-bold text-secondary-light">{formatCurrency(product.weeklyPayment)}</span>
                                <span className="text-[9px] sm:text-[10px] text-gray-400">x {product.weeks || 1} sem</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/product/${product.id}`}
                    className="block w-full rounded-lg bg-primary py-2 sm:py-2.5 text-center text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-primary-light"
                >
                    Ver Detalles
                </Link>
            </div>
        </div>
    );
}
