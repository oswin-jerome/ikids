import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import WebLayout from '@/layouts/web-layout';
import { Cart, CartItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useState } from 'react';

export default function Component({ cartItems, cart }: { cartItems: CartItem[]; cart: Cart }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRazorpayPayment = async () => {
        setIsProcessing(true);
    };

    return (
        <WebLayout>
            <div className="container mx-auto px-4 py-6">
                <div className="mb-6">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                        <Link href="/cart">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Cart
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Checkout</h1>
                </div>

                <div className="grid gap-6 lg:grid-cols-5">
                    {/* Checkout Form */}
                    <div className="space-y-6 lg:col-span-3">
                        {/* Shipping Address */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Main Street"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="postalCode">Postal Code</Label>
                                        <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <Card className="sticky top-4">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Order Items */}
                                <div className="space-y-3">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between text-sm">
                                            <div className="flex-1">
                                                <p className="font-medium">{item.product.name}</p>
                                                <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="font-medium">Rs. {(item.product.selling_price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                {/* Price Breakdown */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>Rs. {cart.sub_total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>Rs. {cart.shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>Rs. {cart.tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>Rs. {cart.total.toFixed(2)}</span>
                                </div>

                                {/* Payment Section */}
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-2">
                                        <Lock className="text-muted-foreground h-4 w-4" />
                                        <span className="text-muted-foreground text-sm">Secure payment</span>
                                    </div>

                                    <Button onClick={handleRazorpayPayment} disabled={isProcessing} className="w-full" size="lg">
                                        {isProcessing ? (
                                            'Processing...'
                                        ) : (
                                            <>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Pay with Razorpay
                                            </>
                                        )}
                                    </Button>

                                    <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
                                        <span>Powered by</span>
                                        <Badge variant="outline" className="text-xs">
                                            Razorpay
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
