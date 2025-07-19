import { usePage, router, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Edit } from 'lucide-react';

const AdminProductsIndex = () => {
    const { props } = usePage();
    const { products, filters = {} } = props;

    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');

    const handleSearch = () => {
        router.get(route('admin.products.index'), {
            search: search || undefined,
            type: type || undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const startIndex = (products.current_page - 1) * products.per_page;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <AppLayout>
            <Head title="Product List" />

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name, SKU or slug"
                    className="border px-3 py-2 rounded w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Types</option>
                    <option value="single">Single</option>
                    <option value="combo">Combo</option>
                </select>
                <Button onClick={handleSearch}>Filter</Button>
            </div>

            {/* Product Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actual Price</TableHead>
                        <TableHead>Selling Price</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.data.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell>{startIndex + index + 1}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className={
                                product.current_stock === 0 ? 'text-red-500' :
                                    product.current_stock < 15 ? 'text-orange-500' : 'text-green-500'
                            }>
                                {product.current_stock}
                            </TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell>{product.type}</TableCell>
                            <TableCell>{product.category?.name || '-'}</TableCell>
                            <TableCell>Rs. {product.actual_price.toFixed(2)}</TableCell>
                            <TableCell>Rs. {product.selling_price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" asChild>
                                    <a href={route('admin.products.edit', product.id)}><Edit /></a>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
                {products.links.map((link, index) => (
                    <Button
                        key={index}
                        variant={link.active ? 'default' : 'outline'}
                        disabled={!link.url}
                        onClick={() =>
                            link.url &&
                            router.get(link.url, {}, { preserveState: true, replace: true })
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </AppLayout>
    );
};

export default AdminProductsIndex;
