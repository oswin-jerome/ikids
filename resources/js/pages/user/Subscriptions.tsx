import SeoHead from '@/components/SeoHead';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import WebLayout from '@/layouts/web-layout';
import { Subscription } from '@/types';
import moment from 'moment';

const OrdersPage = ({ subscriptions }: { subscriptions: Subscription[] }) => {
    return (
        <WebLayout>
            <SeoHead title="Orders" description="List you orders you have made" />
            <div className="container mt-10 min-h-[60dvh]">
                <h2 className="text-2xl font-bold">Subscriptions</h2>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subscription ID</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Ends On</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscriptions.map((subscription) => {
                            return (
                                <TableRow>
                                    <TableCell>{subscription.subscription_id}</TableCell>
                                    <TableCell>{moment(subscription.start_date).format('Do MMM Y')}</TableCell>
                                    <TableCell>{subscription.subscribable_product.name}</TableCell>
                                    <TableCell>{subscription.months} Months</TableCell>
                                    <TableCell>{moment(subscription.end_date).format('Do MMM Y')}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-500">{subscription.status}</Badge>
                                    </TableCell>
                                    <TableCell>Rs. {subscription.amount}</TableCell>
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
