import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import WebLayout from '@/layouts/web-layout';
import { Cart, CartItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Lock } from 'lucide-react';
import { useState } from 'react';
import { RazorpayOrderOptions, useRazorpay } from 'react-razorpay';
import { toast } from 'sonner';

type FieldNames = 'first_name' | 'last_name' | 'address' | 'city' | 'postal_code' | 'phone_number';
type OrderRes = {
    orderId: string;
    db_order_id: string;
    message: string;
    errors?: Partial<Record<FieldNames, string>>;
};

export default function Component({ cartItems, cart }: { cartItems: CartItem[]; cart: Cart; order_id: string; db_order_id: string }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { error, isLoading, Razorpay } = useRazorpay();

    const { processing, errors, data, setData, setError } = useForm({
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        postal_code: '',
        phone_number: '',
    });

    const handleAddressSubmit = async () => {
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        if (!csrfMetaTag || !csrfMetaTag.content) {
            return;
        }
        const csrfToken = csrfMetaTag.content;
        const res = await fetch(route('user.checkout'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({
                ...data,
            }),
        });
        console.log(res);
        if (!res.ok) {
            const errorData: OrderRes = await res.json();
            if (errorData.errors) {
                (Object.keys(errorData.errors) as FieldNames[]).forEach((key) => {
                    const message = errorData.errors?.[key];
                    if (message) {
                        setError(key, message);
                    }
                });
            }
            toast.error('Failed to create order', {
                description: errorData.message || 'An error occurred while creating your subscription order.',
            });
            return;
        }
        const resData: OrderRes = await res.json();
        console.log(resData);
        if (resData.orderId === undefined) {
            toast.error('Unable to create razorpay order', {
                description: resData.message || 'An error occurred while creating your subscription order.',
            });
            return;
        }

        handleRazorpayPayment({
            db_order_id: resData.db_order_id,
            order_id: resData.orderId,
        });
    };

    const handleRazorpayPayment = async ({ order_id, db_order_id }: { order_id: string; db_order_id: string }) => {
        const options: RazorpayOrderOptions = {
            key: 'rzp_test_Wok0nv9mU8B1IW',
            amount: 50000, // Amount in paise
            currency: 'INR',
            name: 'Test Company',
            description: 'Test Transaction',
            order_id: order_id,
            callback_url: route('api.payment.callback', db_order_id),
            handler: async (response) => {
                console.log(response);
                await fetch(route('api.payment.callback', db_order_id), {
                    method: 'post',
                    body: JSON.stringify(response),
                });
                router.get(route('user.orders.index'));
            },
            prefill: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                contact: '9999999999',
            },
        };

        const razorpayInstance = new Razorpay(options);
        await razorpayInstance.open();
        setIsProcessing(false);
    };

    return (
        <WebLayout>
            <Head title="Checkout" />

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
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.first_name} />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.last_name} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="123 Main Street"
                                        required
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" name="city" value={data.city} onChange={(e) => setData('city', e.target.value)} required />
                                        <InputError message={errors.city} />
                                    </div>
                                    <div>
                                        <Label htmlFor="postalCode">Postal Code</Label>
                                        <Input
                                            id="postalCode"
                                            name="postalCode"
                                            value={data.postal_code}
                                            onChange={(e) => setData('postal_code', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.postal_code} />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                    <InputError message={errors.phone_number} />
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

                                    <Button
                                        className="w-full"
                                        size="lg"
                                        disabled={isProcessing || processing || isLoading}
                                        onClick={() => {
                                            handleAddressSubmit();
                                        }}
                                    >
                                        Checkout & Pay
                                    </Button>

                                    {error}

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
