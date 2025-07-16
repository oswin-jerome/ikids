import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, MoreHorizontal, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const revenueData = [
        { period: 'Today', amount: 2847.32, change: 12.5, trend: 'up' },
        { period: 'This Week', amount: 18943.21, change: 8.2, trend: 'up' },
        { period: 'This Month', amount: 89432.18, change: -2.1, trend: 'down' },
    ];

    const recentOrders = [
        { id: '#3210', customer: 'Olivia Martin', amount: 42.25, status: 'Completed', date: '2 hours ago' },
        { id: '#3209', customer: 'Ava Johnson', amount: 74.99, status: 'Processing', date: '4 hours ago' },
        { id: '#3208', customer: 'Michael Johnson', amount: 64.75, status: 'Completed', date: '6 hours ago' },
        { id: '#3207', customer: 'Lisa Anderson', amount: 34.5, status: 'Pending', date: '8 hours ago' },
        { id: '#3206', customer: 'David Wilson', amount: 129.99, status: 'Completed', date: '1 day ago' },
    ];

    const topProducts = [
        { name: 'Wireless Headphones', sales: 1234, revenue: 98720, trend: 'up' },
        { name: 'Smart Watch', sales: 987, revenue: 78960, trend: 'up' },
        { name: 'Laptop Stand', sales: 756, revenue: 45360, trend: 'down' },
        { name: 'USB-C Cable', sales: 2341, revenue: 35115, trend: 'up' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="min-h-screen bg-gray-50/50">
                    <main className="">
                        {/* Key Metrics Cards */}
                        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* Total Products */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                    <Package className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1,247</div>
                                    <p className="text-muted-foreground text-xs">
                                        <span className="flex items-center text-green-600">
                                            <ArrowUpIcon className="mr-1 h-3 w-3" />
                                            +23
                                        </span>
                                        from last month
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Total Customers */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                                    <Users className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">8,492</div>
                                    <p className="text-muted-foreground text-xs">
                                        <span className="flex items-center text-green-600">
                                            <ArrowUpIcon className="mr-1 h-3 w-3" />
                                            +180
                                        </span>
                                        from last month
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Total Orders */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                    <ShoppingCart className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">3,847</div>
                                    <p className="text-muted-foreground text-xs">
                                        <span className="flex items-center text-green-600">
                                            <ArrowUpIcon className="mr-1 h-3 w-3" />
                                            +201
                                        </span>
                                        from last month
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Active Subscriptions */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                                    <CreditCard className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">573</div>
                                    <p className="text-muted-foreground text-xs">
                                        <span className="flex items-center text-green-600">
                                            <ArrowUpIcon className="mr-1 h-3 w-3" />
                                            +12
                                        </span>
                                        from last month
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Revenue Cards */}
                        <div className="mb-4 grid gap-4 md:grid-cols-3">
                            {revenueData.map((revenue) => (
                                <Card key={revenue.period}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Revenue - {revenue.period}</CardTitle>
                                        <DollarSign className="text-muted-foreground h-4 w-4" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">${revenue.amount.toLocaleString()}</div>
                                        <p className="text-muted-foreground text-xs">
                                            <span className={`flex items-center ${revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                                {revenue.trend === 'up' ? (
                                                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                                                ) : (
                                                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                                                )}
                                                {Math.abs(revenue.change)}%
                                            </span>
                                            from previous period
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Recent Orders */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Orders</CardTitle>
                                    <CardDescription>Latest orders from your customers</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Order</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentOrders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">{order.id}</TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">{order.customer}</div>
                                                            <div className="text-muted-foreground text-sm">{order.date}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>${order.amount}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                order.status === 'Completed'
                                                                    ? 'default'
                                                                    : order.status === 'Processing'
                                                                      ? 'secondary'
                                                                      : 'outline'
                                                            }
                                                        >
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>Refund Order</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            {/* Top Products */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Products</CardTitle>
                                    <CardDescription>Best performing products this month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {topProducts.map((product, index) => (
                                            <div key={product.name} className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{product.name}</div>
                                                        <div className="text-muted-foreground text-sm">{product.sales} sales</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium">${product.revenue.toLocaleString()}</div>
                                                    <div
                                                        className={`flex items-center justify-end text-sm ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                                                    >
                                                        {product.trend === 'up' ? (
                                                            <TrendingUp className="mr-1 h-3 w-3" />
                                                        ) : (
                                                            <ArrowDownIcon className="mr-1 h-3 w-3" />
                                                        )}
                                                        {product.trend === 'up' ? '+' : '-'}5.2%
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}
