import AdminForm from '@/components/AdminForm';

export default function AdminPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold text-primary">Panel de Administración</h1>
            <AdminForm />
        </div>
    );
}
