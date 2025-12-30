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
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Agregar Nuevo Dispositivo</h2>

            {message && (
                <div className="rounded-md bg-green-50 p-3 text-green-700 font-medium text-sm">
                    {message}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Marca</label>
                    <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    >
                        {BRANDS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Modelo</label>
                    <input
                        required
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Ej. iPhone 15 Pro"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">URL Imagen</label>
                    <input
                        required
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">RAM</label>
                    <input
                        required
                        name="ram"
                        value={formData.ram}
                        onChange={handleChange}
                        placeholder="Ej. 8GB"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Almacenamiento</label>
                    <input
                        required
                        name="storage"
                        value={formData.storage}
                        onChange={handleChange}
                        placeholder="Ej. 256GB"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Precio Contado</label>
                    <input
                        required
                        type="number"
                        name="priceCash"
                        value={formData.priceCash}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 bg-slate-50 p-4 rounded-lg">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Pago Inicial</label>
                    <input
                        required
                        type="number"
                        name="initialPayment"
                        value={formData.initialPayment}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Pago Semanal</label>
                    <input
                        required
                        type="number"
                        name="weeklyPayment"
                        value={formData.weeklyPayment}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Semanas</label>
                    <input
                        required
                        type="number"
                        name="weeks"
                        value={formData.weeks}
                        onChange={handleChange}
                        placeholder="Ej. 20"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-secondary py-3 font-semibold text-primary transition-colors hover:bg-secondary-light disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : "Guardar Dispositivo"}
            </button>
        </form>
    );
}
