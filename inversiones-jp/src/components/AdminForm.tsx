'use client';

import { useState } from 'react';
import { useStore, Product } from '@/store/useStore';
import { Loader2 } from 'lucide-react';

const BRANDS = ['Samsung', 'Apple', 'Xiaomi', 'ZTE', 'Honor', 'Motorola', 'Otros'];

export default function AdminForm() {
    const addProduct = useStore((state) => state.addProduct);
    const [formData, setFormData] = useState({
        brand: 'Samsung',
        model: '',
        image: '',
        ram: '',
        storage: '',
        priceCash: '',
        initialPayment: '',
        weeklyPayment: '',
        weeks: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate generic validation or processing
        setTimeout(() => {
            const newProduct: Product = {
                id: crypto.randomUUID(),
                brand: formData.brand,
                model: formData.model,
                image: formData.image,
                specifications: {
                    ram: formData.ram,
                    storage: formData.storage,
                },
                priceCash: Number(formData.priceCash),
                initialPayment: Number(formData.initialPayment),
                weeklyPayment: Number(formData.weeklyPayment),
                weeks: Number(formData.weeks) || 1, // Default to 1 to avoid NaN
            };

            addProduct(newProduct);
            setFormData({
                brand: 'Samsung',
                model: '',
                image: '',
                ram: '',
                storage: '',
                priceCash: '',
                initialPayment: '',
                weeklyPayment: '',
                weeks: '',
            });
            setMessage('¡Producto agregado con éxito!');
            setLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl text-white">
            <h2 className="text-2xl font-black text-white">Agregar Nuevo Dispositivo</h2>

            {message && (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 text-emerald-300 font-bold text-sm">
                    {message}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Marca</label>
                    <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                        {BRANDS.map((b) => (
                            <option key={b} value={b} className="bg-slate-950 text-white">{b}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Modelo</label>
                    <input
                        required
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Ej. Samsung A56 5G"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">URL o Ruta de Imagen</label>
                    <input
                        required
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="/phones/samsung-a56-5g.jpg o URL web"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Memoria RAM</label>
                    <input
                        required
                        name="ram"
                        value={formData.ram}
                        onChange={handleChange}
                        placeholder="Ej. 8GB"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Almacenamiento ROM</label>
                    <input
                        required
                        name="storage"
                        value={formData.storage}
                        onChange={handleChange}
                        placeholder="Ej. 256GB"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Precio Referencial Contado (S/)</label>
                    <input
                        required
                        type="number"
                        name="priceCash"
                        value={formData.priceCash}
                        onChange={handleChange}
                        placeholder="Ej. 1500"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 bg-slate-950/70 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Pago Inicial (S/)</label>
                    <input
                        required
                        type="number"
                        name="initialPayment"
                        value={formData.initialPayment}
                        onChange={handleChange}
                        placeholder="Ej. 150"
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Cuota Semanal (S/)</label>
                    <input
                        required
                        type="number"
                        name="weeklyPayment"
                        value={formData.weeklyPayment}
                        onChange={handleChange}
                        placeholder="Ej. 180"
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Plazo (Semanas)</label>
                    <input
                        required
                        type="number"
                        name="weeks"
                        value={formData.weeks}
                        onChange={handleChange}
                        placeholder="12"
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-3.5 font-black text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/40 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Guardar Dispositivo en Catálogo"}
            </button>
        </form>
    );
}
