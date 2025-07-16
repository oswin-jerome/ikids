import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Order, Subscription, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { NutOffIcon, ShoppingBasket, View } from 'lucide-react';
import moment from 'moment';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: route('admin.users.index'),
    },
];

const ShowCustomer = ({ customer, subscriptions, orders }: { customer: User; subscriptions: Subscription[]; orders: Order[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div>
                    <h4 className="font-bold">Name</h4>
                    <p>{customer.name}</p>
                </div>
                <div>
                    <h4 className="font-bold">Email</h4>
                    <p>{customer.email}</p>
                </div>
            </div>
            {subscriptions.length > 0 ? (
                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle>Customer Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
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
                                            <TableCell>{subscription.subscribable_product.name}</TableCell>
                                            <TableCell>{subscription.months}</TableCell>
                                            <TableCell>{subscription.amount}</TableCell>
                                            <TableCell>
                                                {subscription.status === 'active' && (
                                                    <Badge className="bg-green-500 capitalize">{subscription.status}</Badge>
                                                )}
                                                {subscription.status !== 'active' && (
                                                    <Badge className="bg-red-500 capitalize">{subscription.status}</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{moment(subscription.start_date).format('Do MMM Y')}</TableCell>
                                            <TableCell>{moment(subscription.end_date).format('Do MMM Y')}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <div>
                    <Alert className="mt-10">
                        <NutOffIcon size={32} />
                        <AlertTitle>No Subscriptions</AlertTitle>
                        <AlertDescription>Customer has no active or past subscriptions.</AlertDescription>
                    </Alert>
                </div>
            )}
            {orders.length > 0 ? (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Customer Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
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
                    </CardContent>
                </Card>
            ) : (
                <div>
                    <Alert className="mt-4">
                        <ShoppingBasket size={32} />
                        <AlertTitle>No Orders</AlertTitle>
                        <AlertDescription>Customer has not placed any orders yet.</AlertDescription>
                    </Alert>
                </div>
            )}
        </AppLayout>
    );
};

export default ShowCustomer;
