'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const BRANDS = ['Todas', 'Samsung', 'Apple', 'Xiaomi', 'ZTE', 'Honor', 'Motorola'];

export default function FilterBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentBrand = searchParams.get('brand') || 'Todas';

    const handleSelect = (brand: string) => {
        const params = new URLSearchParams(searchParams);
        if (brand === 'Todas') {
            params.delete('brand');
        } else {
            params.set('brand', brand);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="sticky top-16 sm:top-20 z-20 w-full py-3 backdrop-blur-xl bg-slate-950/85 border-y border-slate-800/80 mb-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-1 py-1">
                {BRANDS.map((brand) => {
                    const isSelected = currentBrand === brand;
                    return (
                        <button
                            key={brand}
                            onClick={() => handleSelect(brand)}
                            className={cn(
                                "rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap border cursor-pointer select-none",
                                isSelected
                                    ? "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white border-cyan-300 shadow-lg shadow-cyan-500/30 scale-102"
                                    : "bg-slate-900/90 text-slate-300 border-slate-700/70 hover:bg-slate-800 hover:text-white hover:border-slate-600 active:scale-98"
                            )}
                        >
                            {brand}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
