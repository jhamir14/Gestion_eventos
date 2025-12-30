'use client';

import { useStore, Product } from '@/store/useStore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatCurrency, cn } from '@/lib/utils';
import { MessageCircle, Check, Shield, Truck, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductDetail({ id }: { id: string }) {
    const { products } = useStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Avoid hydration mismatch by waiting for mount
        const p = products.find((p) => p.id === id);
        setProduct(p || null);
        setLoading(false);
    }, [id, products]);

    if (loading) return <div className="p-10 text-center">Cargando detalles...</div>;
    if (!product) return <div className="p-10 text-center">Producto no encontrado.</div>;

    const whatsappMessage = `Hola Inversiones JP, estoy interesado en el ${product.brand} ${product.model} con inicial de ${formatCurrency(product.initialPayment)}.`;
    const whatsappLink = `https://wa.me/51920694641?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al catálogo
            </Link>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white p-8 shadow-inner">
                    <Image
                        src={product.image || '/placeholder-phone.png'}
                        alt={product.model}
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                            {product.brand}
                        </span>
                        <h1 className="text-4xl font-bold text-gray-900">{product.model}</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                        <div>
                            <p className="text-sm text-gray-500">Memoria RAM</p>
                            <p className="font-semibold text-gray-900">{product.specifications?.ram || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Almacenamiento</p>
                            <p className="font-semibold text-gray-900">{product.specifications?.storage || 'N/A'}</p>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="rounded-2xl border-2 border-primary/5 p-6 shadow-xl ring-1 ring-gray-900/5">
                        <div className="mb-6 flex items-baseline justify-between border-b pb-6">
                            <span className="text-gray-600">Precio de Contado</span>
                            <span className="text-3xl font-bold text-primary">{formatCurrency(product.priceCash)}</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Plan Financiamiento</h3>

                            <div className="flex items-center justify-between rounded-lg bg-surface p-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Inicial</span>
                                    <span className="text-lg font-bold text-secondary-light">{formatCurrency(product.initialPayment)}</span>
                                </div>
                                <div className="h-8 w-px bg-gray-200"></div>
                                <div className="flex flex-col text-right">
                                    <span className="text-sm text-gray-500">Semanal</span>
                                    <span className="text-lg font-bold text-secondary-light">{formatCurrency(product.weeklyPayment)}</span>
                                    <span className="text-xs text-gray-400">durante {product.weeks || 1} semanas</span>
                                </div>
                            </div>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white transition-all hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-green-500/20"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Cotizar por WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Check className="h-5 w-5 text-secondary" />
                            <span>Garantía de 30 días</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Shield className="h-5 w-5 text-secondary" />
                            <span>Equipos 100% verificados</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Truck className="h-5 w-5 text-secondary" />
                            <span>Entrega inmediata</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
