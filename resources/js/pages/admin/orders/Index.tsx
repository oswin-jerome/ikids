import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Order } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { View } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: route('admin.orders.index'),
    },
];

type QueryType = {
    status: string;
    payment_status: string;
    order_id: string;
};

const AdminOrdersIndex = ({ orders, status }: { orders: Order[]; status: string }) => {
    const [query, setQuery] = useState({
        status: 'all',
        payment_status: 'all',
        order_id: '',
    });

    const handleQuery = (da: QueryType) => {
        router.get(
            route('admin.orders.index', {
                _query: da,
            }),
            {},
            { preserveState: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders List" />
            <Card className="shadow-none">
                <CardHeader>
                    <CardTitle>Filter</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-4">
                    <div className="flex items-end gap-2">
                        <div>
                            <Label>Order ID</Label>
                            <Input defaultValue={query.order_id} onChange={(e) => setQuery({ ...query, order_id: e.target.value })} />
                        </div>
                        <Button
                            size={'sm'}
                            onClick={(e) => {
                                e.preventDefault();
                                handleQuery(query);
                            }}
                        >
                            Search
                        </Button>
                    </div>
                    <div className="grid gap-2">
                        <Label>Order Status</Label>
                        <Select
                            defaultValue={status}
                            onValueChange={(val) => {
                                setQuery({ ...query, status: val });
                                handleQuery({ ...query, status: val });
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Payment Status</Label>
                        <Select
                            defaultValue={status}
                            onValueChange={(val) => {
                                setQuery({ ...query, payment_status: val });
                                handleQuery({ ...query, payment_status: val });
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => {
                        return (
                            <TableRow key={'orders_' + order.id}>
                                <TableCell>{order.order_id}</TableCell>
                                <TableCell>{moment(order.created_at).format('D MMM Y H:ss a')}</TableCell>
                                <TableCell>Rs. {order.total_amount}</TableCell>
                                <TableCell>{order.type}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={'outline'}
                                        className={cn('min-w-[100px] px-2', {
                                            'border-amber-500 text-amber-500': order.status == 'pending',
                                            'border-yellow-500 text-yellow-500': order.status == 'processing',
                                            'border-blue-500 text-blue-500': order.status == 'shipped',
                                            'border-green-500 text-green-500': order.status == 'completed',
                                            'border-red-500 text-red-500': order.status == 'cancelled',
                                        })}
                                    >
                                        {order.status.charAt(0).toUpperCase() + order.status.substring(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={'outline'}
                                        className={cn('min-w-[100px] px-2', {
                                            'border-amber-500 text-amber-500': order.payment_status == 'pending',
                                            'border-red-500 text-red-500': order.payment_status == 'failed',
                                            'border-green-500 text-green-500': order.payment_status == 'completed',
                                        })}
                                    >
                                        {order.payment_status.charAt(0).toUpperCase() + order.payment_status.substring(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={route('admin.orders.show', order.id)}>
                                        <Button>
                                            <View />
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

export default AdminOrdersIndex;
