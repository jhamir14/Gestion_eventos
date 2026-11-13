'use client';

import { useStore, Product } from '@/store/useStore';
import Image from 'next/image';
import { formatCurrency, cn } from '@/lib/utils';
import {
    MessageCircle,
    Check,
    Shield,
    Truck,
    ArrowLeft,
    Smartphone,
    Cpu,
    HardDrive,
    Layers,
    Camera,
    BatteryCharging,
    Zap,
    ShieldCheck,
    Sparkles,
    Package,
    Wifi,
    Calculator,
    Tag
} from 'lucide-react';
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

    if (loading) return <div className="p-10 text-center text-slate-400 font-medium">Cargando detalles del equipo...</div>;
    if (!product) return <div className="p-10 text-center text-slate-400 font-medium">Producto no encontrado en el catálogo.</div>;

    const whatsappMessage = `Hola Inversiones JP, estoy interesado en el ${product.brand} ${product.model} con inicial de ${formatCurrency(product.initialPayment)} y cuotas de ${formatCurrency(product.weeklyPayment)} semanales.`;
    const whatsappLink = `https://wa.me/51920694641?text=${encodeURIComponent(whatsappMessage)}`;

    const specs = product.specifications || {};

    const specList = [
        { label: 'Red / Conectividad', value: specs.network, icon: Wifi },
        { label: 'Pantalla', value: specs.screen, icon: Smartphone },
        { label: 'Procesador', value: specs.processor, icon: Cpu },
        { label: 'Memoria RAM', value: specs.ram, icon: Layers },
        { label: 'Almacenamiento', value: specs.storage, icon: HardDrive },
        { label: 'Cámara Trasera', value: specs.rearCamera, icon: Camera },
        { label: 'Cámara Frontal (Selfie)', value: specs.frontCamera, icon: Camera },
        { label: 'Batería', value: specs.battery, icon: BatteryCharging },
        { label: 'Carga Rápida', value: specs.charging, icon: Zap },
        { label: 'Resistencia / Certificación', value: specs.resistance, icon: ShieldCheck },
        { label: 'IA y Funciones Especiales', value: specs.aiExtras, icon: Sparkles },
        { label: 'Accesorios Incluidos', value: specs.accessories, icon: Package },
    ].filter((item) => item.value);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl space-y-10">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-cyan-400"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver al catálogo
            </Link>

            <div className="grid gap-10 lg:grid-cols-2 items-start">
                {/* Image Section - Clean High-Contrast Display */}
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-white p-8 shadow-2xl border border-slate-700/60 flex items-center justify-center">
                    <Image
                        src={product.image || '/placeholder-phone.png'}
                        alt={product.model}
                        fill
                        priority
                        className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Main Purchase & Pricing Info */}
                <div className="space-y-6">
                    <div>
                        <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-400/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                            {product.brand}
                        </span>
                        <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                            {product.model}
                        </h1>
                    </div>

                    {/* Brief Marketing Description */}
                    {product.description && (
                        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 text-sm text-slate-200 leading-relaxed shadow-lg">
                            <p className="font-extrabold text-cyan-300 mb-1 flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4 text-cyan-400" /> Descripción Oficial:
                            </p>
                            <p>{product.description}</p>
                        </div>
                    )}

                    {/* Quick Specs Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="rounded-xl bg-slate-900/80 p-3.5 border border-slate-800">
                            <p className="text-xs text-slate-400 font-semibold">Memoria RAM</p>
                            <p className="text-sm font-black text-white mt-0.5">{specs.ram || 'N/A'}</p>
                        </div>
                        <div className="rounded-xl bg-slate-900/80 p-3.5 border border-slate-800">
                            <p className="text-xs text-slate-400 font-semibold">Almacenamiento</p>
                            <p className="text-sm font-black text-white mt-0.5">{specs.storage || 'N/A'}</p>
                        </div>
                        {specs.battery && (
                            <div className="rounded-xl bg-slate-900/80 p-3.5 border border-slate-800 col-span-2 sm:col-span-1">
                                <p className="text-xs text-slate-400 font-semibold">Batería</p>
                                <p className="text-sm font-black text-white mt-0.5">{specs.battery}</p>
                            </div>
                        )}
                    </div>

                    {/* Pricing Card (Plan de Financiamiento) */}
                    <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-8 shadow-2xl ring-1 ring-cyan-500/20">
                        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-5">
                            <div>
                                <span className="block text-xs uppercase tracking-widest text-cyan-400 font-black">Plan de Financiamiento</span>
                                <span className="text-3xl sm:text-4xl font-black text-white mt-1 block">
                                    {formatCurrency(product.weeklyPayment)} <span className="text-sm sm:text-base font-semibold text-slate-400">/ semanal</span>
                                </span>
                            </div>
                            <span className="rounded-full bg-cyan-500/15 px-3.5 py-1 text-xs font-black text-cyan-300 border border-cyan-400/30">
                                {product.weeks} Semanas
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-2xl bg-slate-950/80 p-4 border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                                        <Tag className="h-3.5 w-3.5 text-cyan-400" /> Precio al Contado
                                    </span>
                                    <span className="text-xl sm:text-2xl font-black text-white">{formatCurrency(product.priceCash)}</span>
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 font-semibold">Pago Inicial</span>
                                        <span className="text-lg sm:text-xl font-black text-slate-200">{formatCurrency(product.initialPayment)}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-xs text-slate-400 font-semibold">Cuota Semanal</span>
                                        <span className="text-lg sm:text-xl font-black text-cyan-400">{formatCurrency(product.weeklyPayment)}</span>
                                        <span className="text-[10px] text-slate-500 font-medium">x {product.weeks} semanas</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-black text-white shadow-lg shadow-green-500/20 transition-all hover:bg-[#20bd5a] hover:shadow-green-500/30 active:scale-98 text-base"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Cotizar por WhatsApp
                            </a>

                            <Link
                                href={`/simulador?phone=${product.id}`}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950/80 border border-cyan-400/30 px-5 py-3 font-bold text-cyan-300 transition-all hover:bg-cyan-500/10 hover:border-cyan-400 text-xs sm:text-sm text-center"
                            >
                                <Calculator className="h-4 w-4 text-cyan-400" />
                                Personalizar Inicial o Semanas en el Simulador
                            </Link>
                        </div>
                    </div>

                    {/* Guarantees */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <span>Garantía Oficial</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                            <Shield className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                            <span>100% Original</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                            <Truck className="h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span>Entrega Inmediata</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Official Brochure Specifications Section */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                <div className="mb-6 border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                        Ficha Técnica Oficial del Catálogo
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Especificaciones completas y verificadas para el {product.brand} {product.model}.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {specList.map((spec, index) => {
                        const IconComponent = spec.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-3 rounded-2xl bg-slate-950/70 p-4 border border-slate-800/80 transition-all hover:border-cyan-500/40 hover:bg-slate-950"
                            >
                                <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-800 text-cyan-400">
                                    <IconComponent className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        {spec.label}
                                    </p>
                                    <p className="text-sm font-extrabold text-white mt-0.5 break-words">
                                        {spec.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
