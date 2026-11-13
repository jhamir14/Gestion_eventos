import { Suspense } from 'react';
import CreditSimulator from '@/components/CreditSimulator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface SimulatorPageProps {
  searchParams: Promise<{ phone?: string }>;
}

export default async function SimulatorPage({ searchParams }: SimulatorPageProps) {
  const resolvedParams = await searchParams;
  const initialProductId = resolvedParams?.phone;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-cyan-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al Catálogo
      </Link>

      <Suspense fallback={<div className="text-center py-20 text-slate-400">Cargando simulador de crédito...</div>}>
        <CreditSimulator initialProductId={initialProductId} />
      </Suspense>
    </div>
  );
}

