import { Suspense } from 'react';
import CatalogList from '@/components/CatalogList';
import FilterBar from '@/components/FilterBar';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">Nuestros Equipos</h1>
        <p className="text-gray-600">Encuentra el celular perfecto para ti, al contado o financiado.</p>
      </div>

      <Suspense fallback={<div>Cargando filtros...</div>}>
        <FilterBar />
      </Suspense>

      <Suspense fallback={<div>Cargando productos...</div>}>
        <CatalogList />
      </Suspense>
    </div>
  );
}
