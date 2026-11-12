'use client';

import { useStore } from '@/store/useStore';
import ProductCard from './ProductCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CatalogList() {
    const { products } = useStore();
    const searchParams = useSearchParams();
    const brandFilter = searchParams.get('brand');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="py-20 text-center">Cargando catálogo...</div>;
    }

    const filteredProducts = products.filter((p) => {
        if (!brandFilter || brandFilter === 'Todas') return true;
        return p.brand === brandFilter;
    });

    if (filteredProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
                <ShoppingBag className="mb-4 h-16 w-16 text-slate-600" />
                <h3 className="text-xl font-bold text-white">No se encontraron productos</h3>
                <p className="text-sm text-slate-400 mt-1">Prueba seleccionando otra marca o explora todas las opciones.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
