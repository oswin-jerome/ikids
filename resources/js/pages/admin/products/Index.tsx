import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Product } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('admin.products.index'),
    },
];

const AdminProductsIndex = ({ products }: { products: Product[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product List" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actual Price</TableHead>
                        <TableHead>Selling Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((re) => {
                        return (
                            <TableRow>
                                <TableCell>{re.name}</TableCell>
                                <TableCell
                                    className={cn({
                                        'text-orange-500': re.current_stock < 15 && re.current_stock > 0,
                                        'text-red-500': re.current_stock == 0,
                                        'text-green-500': re.current_stock >= 15,
                                    })}
                                >
                                    {re.current_stock}
                                </TableCell>
                                <TableCell>{re.sku}</TableCell>
                                <TableCell>{re.type}</TableCell>
                                <TableCell>Rs. {re.actual_price}</TableCell>
                                <TableCell>Rs. {re.selling_price}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </AppLayout>
    );
};

export default AdminProductsIndex;
