import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
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
                                <TableCell>{re.sku}</TableCell>
                                <TableCell>{re.type}</TableCell>
                                <TableCell>{re.actual_price}</TableCell>
                                <TableCell>{re.selling_price}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </AppLayout>
    );
};

export default AdminProductsIndex;
