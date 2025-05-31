'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Order } from '@/types';
import { CheckCircle, Clock, CreditCard, Edit, Mail, MapPin, Package, Phone, RefreshCw, Save, Truck, User, X } from 'lucide-react';
import { useState } from 'react';

interface OrderItem {
    id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    image: string;
}

interface StatusHistory {
    status: string;
    timestamp: string;
    note?: string;
    updatedBy: string;
}

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3 w-3" /> },
    processing: { label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: <RefreshCw className="h-3 w-3" /> },
    shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', icon: <Truck className="h-3 w-3" /> },
    completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="h-3 w-3" /> },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: <X className="h-3 w-3" /> },
};

export default function Component({ order }: { order: Order }) {
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>('processing');
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [newStatus, setNewStatus] = useState<OrderStatus>(currentStatus);
    const [statusNote, setStatusNote] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('1Z999AA1234567890');

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

    const orderItems: OrderItem[] = [
        {
            id: '1',
            name: 'Wireless Bluetooth Headphones',
            sku: 'WBH-001',
            price: 79.99,
            quantity: 1,
            image: '/placeholder.svg?height=60&width=60',
        },
        {
            id: '2',
            name: 'Premium Cotton T-Shirt',
            sku: 'PCT-002',
            price: 29.99,
            quantity: 2,
            image: '/placeholder.svg?height=60&width=60',
        },
    ];

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

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleStatusUpdate = () => {
        setCurrentStatus(newStatus);
        setIsEditingStatus(false);
        // Here you would typically make an API call to update the status
        console.log('Status updated to:', newStatus, 'Note:', statusNote);
        setStatusNote('');
    };

    const cancelStatusEdit = () => {
        setNewStatus(currentStatus);
        setIsEditingStatus(false);
        setStatusNote('');
    };

    return (
        <AppLayout>
            <div className="container mx-auto max-w-6xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="mb-2 text-2xl font-bold">Order {order.order_id}</h1>
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
                            <Card className="border-blue-200 bg-blue-50">
                                <CardHeader>
                                    <CardTitle className="text-lg">Update Order Status</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="status">New Status</Label>
                                            <Select value={newStatus} onValueChange={(value: OrderStatus) => setNewStatus(value)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(statusConfig).map(([key, config]) => (
                                                        <SelectItem key={key} value={key}>
                                                            <div className="flex items-center gap-2">
                                                                {config.icon}
                                                                {config.label}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {newStatus === 'shipped' && (
                                            <div>
                                                <Label htmlFor="tracking">Tracking Number</Label>
                                                <Input
                                                    id="tracking"
                                                    value={trackingNumber}
                                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                                    placeholder="Enter tracking number"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="note">Status Note (Optional)</Label>
                                        <Textarea
                                            id="note"
                                            value={statusNote}
                                            onChange={(e) => setStatusNote(e.target.value)}
                                            placeholder="Add a note about this status change..."
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={handleStatusUpdate}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Update Status
                                        </Button>
                                        <Button variant="outline" onClick={cancelStatusEdit}>
                                            Cancel
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Order Items */}
                        <Card className="opacity-30">
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
                                                src={item.image || '/placeholder.svg'}
                                                alt={item.name}
                                                className="bg-muted h-16 w-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium">{item.name}</h4>
                                                <p className="text-muted-foreground text-sm">SKU: {item.sku}</p>
                                                <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-muted-foreground text-sm">${item.price.toFixed(2)} each</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status History */}
                        <Card className="opacity-30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Status History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {statusHistory.map((entry, index) => (
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
                                                    <p className="font-medium">{statusConfig[order.status].label}</p>
                                                    <p className="text-muted-foreground text-sm">{entry.timestamp}</p>
                                                </div>
                                                <p className="text-muted-foreground mb-1 text-sm">Updated by: {entry.updatedBy}</p>
                                                {entry.note && <p className="text-sm">{entry.note}</p>}
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
                                    <p className="text-muted-foreground">Transaction ID: {orderData.payment.transactionId}</p>
                                    <p className="font-semibold text-green-600">Rs. {order.total_amount} Paid</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
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
