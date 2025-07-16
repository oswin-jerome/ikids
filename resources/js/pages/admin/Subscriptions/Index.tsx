import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Subscription } from '@/types';
import { Head } from '@inertiajs/react';
import moment from 'moment';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscriptions',
        href: route('admin.subscriptions.index'),
    },
];

const AdminSubscribableProductIndex = ({ subscriptions }: { subscriptions: Subscription[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription List" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Subscribable Product</TableHead>
                        <TableHead>Months</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Ends At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((subscription) => {
                        return (
                            <TableRow key={subscription.id}>
                                <TableCell>{subscription.id}</TableCell>
                                <TableCell>{subscription.customer?.name || 'N/A'}</TableCell>
                                <TableCell>{subscription.subscribable_product.name}</TableCell>
                                <TableCell>{subscription.months}</TableCell>
                                <TableCell>{subscription.amount}</TableCell>
                                <TableCell>
                                    {subscription.status === 'active' && <Badge className="bg-green-500 capitalize">{subscription.status}</Badge>}
                                    {subscription.status !== 'active' && <Badge className="bg-red-500 capitalize">{subscription.status}</Badge>}
                                </TableCell>
                                <TableCell>{moment(subscription.start_date).format('Do MMM Y')}</TableCell>
                                <TableCell>{moment(subscription.end_date).format('Do MMM Y')}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </AppLayout>
    );
};

export default AdminSubscribableProductIndex;
