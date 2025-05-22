import SeoHead from '@/components/SeoHead';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import WebLayout from '@/layouts/web-layout';

const OrdersPage = () => {
    return (
        <WebLayout>
            <SeoHead title="Orders" description="List you orders you have made" />
            <div className="container mt-10 min-h-[60dvh]">
                <h2 className="text-2xl font-bold">Subscriptions</h2>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order #</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Ends On</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>ABC123</TableCell>
                            <TableCell>12 Months</TableCell>
                            <TableCell>12 Dec 2025</TableCell>
                            <TableCell>
                                <Badge className="bg-green-500">Active</Badge>
                            </TableCell>
                            <TableCell>Rs. 500</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ABC125</TableCell>
                            <TableCell>3 Months</TableCell>
                            <TableCell>5 Aug 2025</TableCell>
                            <TableCell>
                                <Badge className="bg-red-500">Expired</Badge>
                            </TableCell>
                            <TableCell>Rs. 500</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </WebLayout>
    );
};

export default OrdersPage;
