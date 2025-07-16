import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SubscribableProduct } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EyeIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscribable Products',
        href: route('admin.subscribable-products.index'),
    },
];

const AdminSubscribableProductIndex = ({ subscribableProducts }: { subscribableProducts: SubscribableProduct[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product List" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price Per Month</TableHead>
                        <TableHead>Active Subscriptions</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscribableProducts.map((re) => {
                        return (
                            <TableRow>
                                <TableCell>{re.name}</TableCell>
                                <TableCell>{re.price_per_month}</TableCell>
                                <TableCell>{re.subscriptions_count}</TableCell>
                                <TableCell>
                                    <Link href={route('admin.subscribable-products.show', re.id)}>
                                        <Button variant={'ghost'} size="icon">
                                            <EyeIcon />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </AppLayout>
    );
};

export default AdminSubscribableProductIndex;
