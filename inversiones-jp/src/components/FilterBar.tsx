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
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md w-full overflow-x-auto pb-4 pt-4 no-scrollbar border-b border-gray-100 mb-4 transition-all">
            <div className="flex gap-2 px-2">
                {BRANDS.map((brand) => (
                    <button
                        key={brand}
                        onClick={() => handleSelect(brand)}
                        className={cn(
                            "rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap border",
                            currentBrand === brand
                                ? "bg-secondary text-primary border-secondary shadow-md"
                                : "bg-white text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary"
                        )}
                    >
                        {brand}
                    </button>
                ))}
            </div>
        </div>
    );
}
