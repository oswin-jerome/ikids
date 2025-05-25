import SeoHead from '@/components/SeoHead';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import WebLayout from '@/layouts/web-layout';
import { cn } from '@/lib/utils';
import { Order } from '@/types';
import moment from 'moment';
const OrdersPage = ({ orders }: { orders: Order[] }) => {
    return (
        <WebLayout>
            <SeoHead title="Orders" description="List you orders you have made" />
            <div className="container mt-10 min-h-[60dvh]">
                <h2 className="text-2xl font-bold">Orders</h2>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
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
                                    <TableCell></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </WebLayout>
    );
};

export default OrdersPage;
