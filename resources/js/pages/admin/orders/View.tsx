'use client';

import SeoHead from '@/components/SeoHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { CartItem, Order, OrderEvent } from '@/types';
import { CheckCircle, Clock, CreditCard, Edit, FileSpreadsheet, Mail, MapPin, Package, Phone, RefreshCw, Truck, User, X } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import UpdateOrder from './UpdateOrder';

interface StatusHistory {
    status: string;
    timestamp: string;
    note?: string;
    updatedBy: string;
}

// type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3 w-3" /> },
    processing: { label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: <RefreshCw className="h-3 w-3" /> },
    shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: <Truck className="h-3 w-3" /> },
    completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="h-3 w-3" /> },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: <X className="h-3 w-3" /> },
};

export default function Component({ order, orderItems, orderEvents }: { order: Order; orderItems: CartItem[]; orderEvents: OrderEvent[] }) {
    const [isEditingStatus, setIsEditingStatus] = useState(false);

    const orderData = {
        id: 'ORD-2024-001234',
        date: '2024-01-15',
        customer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
        },
        shipping: {
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States',
        },
        billing: {
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States',
        },
        payment: {
            method: 'Razorpay',
            transactionId: 'rzp_1234567890',
            amount: 149.97,
        },
    };

    const statusHistory: StatusHistory[] = [
        {
            status: 'pending',
            timestamp: '2024-01-15 10:30 AM',
            updatedBy: 'System',
            note: 'Order placed by customer',
        },
        {
            status: 'confirmed',
            timestamp: '2024-01-15 11:15 AM',
            updatedBy: 'Admin',
            note: 'Payment verified and order confirmed',
        },
        {
            status: 'processing',
            timestamp: '2024-01-15 02:30 PM',
            updatedBy: 'Warehouse',
            note: 'Items picked and being prepared for shipment',
        },
    ];

    return (
        <AppLayout>
            <SeoHead title={'Order details : ' + order.order_id} description="" />

            <div className="container mx-auto max-w-6xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="mb-2 flex items-center gap-4 text-2xl font-bold">
                            Order {order.order_id}{' '}
                            <Badge
                                className={cn('capitalize', {
                                    'bg-violet-400': order.type === 'subscription',
                                    'bg-amber-400': order.type === 'direct',
                                })}
                            >
                                {order.type}
                            </Badge>
                        </h1>
                        <p className="text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={`${statusConfig[order.status].color} flex items-center gap-1`}>
                            {statusConfig[order.status].icon}
                            {statusConfig[order.status].label}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => setIsEditingStatus(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update Status
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Status Update */}
                        {isEditingStatus && (
                            <UpdateOrder
                                order={order}
                                order_id={order.id}
                                onClose={() => {
                                    setIsEditingStatus(false);
                                }}
                            />
                        )}

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Order Items
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orderItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                                            <img
                                                src={item.product.cover}
                                                alt={item.product.name}
                                                className="bg-muted h-16 w-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium">{item.product.name}</h4>
                                                <p className="text-muted-foreground text-sm">SKU: {item.product.sku}</p>
                                                <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-muted-foreground text-sm">${item.price} each</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-2">
                                    {/* <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${order.total_amount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div> */}
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${order.total_amount}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Status History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {orderEvents.map((entry, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${statusConfig[order.status].color}`}
                                                >
                                                    {statusConfig[order.status].icon}
                                                </div>
                                                {index < statusHistory.length - 1 && <div className="bg-border mt-2 h-8 w-px" />}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="mb-1 flex items-start justify-between">
                                                    <p className="font-medium">{entry.title}</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        {moment(entry.created_at).format('D MMM Y h:s a')}
                                                    </p>
                                                </div>
                                                <p className="text-muted-foreground mb-1 text-sm">Updated by: {entry.actor}</p>
                                                {entry.description && <p className="text-sm">{entry.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Customer
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="font-medium">{order.customer?.name}</p>
                                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                        <Mail className="h-3 w-3" />
                                        {order.customer?.email}
                                    </div>
                                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                        <Phone className="h-3 w-3" />
                                        {order.phone_number}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1 text-sm">
                                    <p className="font-medium">{order.first_name + ' ' + order.last_name}</p>
                                    <p>{order.address}</p>
                                    <p>
                                        {order.city},{order.postal_code}
                                    </p>
                                    {/* <p>{orderData.shipping.country}</p> */}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-sm">
                                    <p className="font-medium">{orderData.payment.method}</p>
                                    <p className="text-muted-foreground">Transaction ID: {order.razorpay_payment_id}</p>
                                    <p className="text-muted-foreground">Order ID: {order.razorpay_order_id}</p>

                                    {order.payment_status === 'completed' && (
                                        <p className="font-semibold text-green-600">Rs. {order.total_amount} Paid</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <a href={route('user.orders.invoice', order.order_id)} className="block" target="_blank">
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                                        View Invoice
                                    </Button>
                                </a>
                                <Button variant="outline" className="w-full justify-start">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Email Update
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Package className="mr-2 h-4 w-4" />
                                    Print Shipping Label
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Refund Order
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
