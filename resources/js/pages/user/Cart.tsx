import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WebLayout from '@/layouts/web-layout';
import { Cart, CartItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

export default function Component({ cartItems, cart }: { cartItems: CartItem[]; cart: Cart }) {
    // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // const shipping = subtotal > 50 ? 0 : 9.99;
    // const tax = subtotal * 0.08;
    // const total = subtotal + shipping + tax;

    const updateQuantity = (product_id: number, quantity: number) => {
        router.post(route('user.cart.add', product_id), {
            quantity: quantity,
        });
    };

    if (cartItems.length === 0) {
        return (
            <WebLayout>
                <Head title="Empty Cart" />

                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-md text-center">
                        <ShoppingBag className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                        <h2 className="mb-2 text-2xl font-bold">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <Button asChild>
                            <Link href="/shop">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Continue Shopping
                            </Link>
                        </Button>
                    </div>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <Head title="Cart" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold">Shopping Cart</h1>
                    <p className="text-muted-foreground">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid min-h-screen gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="space-y-4 lg:col-span-2">
                        {cartItems.map((item) => (
                            <Card key={item.id} className="p-0">
                                <CardContent className="flex justify-between gap-4 p-2">
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <img
                                                src={item.product.cover || '/placeholder.svg'}
                                                alt={item.product.name}
                                                width={120}
                                                height={120}
                                                className="aspect-square rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <h4 className="text-xl font-bold">{item.product.name}</h4>
                                            <h5 className="mt-2 font-semibold">Rs. {item.quantity * item.product.selling_price}</h5>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={() => {
                                                    updateQuantity(item.product_id, item.quantity - 1);
                                                }}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <Button
                                                onClick={() => {
                                                    updateQuantity(item.product_id, item.quantity + 1);
                                                }}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <div className="flex items-center justify-between pt-4">
                            <Button variant="outline" asChild>
                                <Link href="/shop">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Continue Shopping
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${cart.sub_total.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{cart.shipping === 0 ? <span className="text-green-600">Free</span> : `$${cart.shipping.toFixed(2)}`}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${cart.tax.toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${cart.total.toFixed(2)}</span>
                                </div>

                                {cart.shipping > 0 && (
                                    <p className="text-muted-foreground text-sm">Add ${(50 - cart.sub_total).toFixed(2)} more for free shipping</p>
                                )}
                            </CardContent>

                            <CardFooter className="flex flex-col gap-2">
                                <Link href={route('user.checkout')} className="w-full">
                                    <Button className="w-full" size="lg">
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full">
                                    Save for Later
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
