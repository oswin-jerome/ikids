import SeoHead from '@/components/SeoHead';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import WebLayout from '@/layouts/web-layout';

const OrdersPage = () => {
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
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>ABC123</TableCell>
                            <TableCell>25 May 2025</TableCell>
                            <TableCell>Rs. 500</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ABC125</TableCell>
                            <TableCell>25 May 2025</TableCell>
                            <TableCell>Rs. 500</TableCell>
                            <TableCell>Subscription</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </WebLayout>
    );
};

export default OrdersPage;
