import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { RazorpayOrderOptions, useRazorpay } from 'react-razorpay';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
const SubscriptionButton = ({ productId, months, className }: { productId: string; months: number; className: string }) => {
    const { Razorpay } = useRazorpay();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        city: '',
        postal_code: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRazorpayPayment = async () => {
        toast.loading('Processing your subscription...', {
            duration: 6,
            description: 'Please wait while we process your subscription.',
            id: 'subscription-processing',
        });
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        if (!csrfMetaTag || !csrfMetaTag.content) {
            return;
        }
        const csrfToken = csrfMetaTag.content;
        const res = await fetch(route('user.subscriptions.create_order'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({
                subscribable_product_id: productId,
                months: months,
                address: JSON.stringify(formData),
            }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            toast.error('Failed to create order', {
                description: errorData.message || 'An error occurred while creating your subscription order.',
            });
            return;
        }

        const data = await res.json();
        if (data.order_id === undefined) {
            toast.error('Unable to create order', {
                description: data.message || 'An error occurred while creating your subscription order.',
            });
            return;
        }
        const options: RazorpayOrderOptions = {
            key: 'rzp_test_Wok0nv9mU8B1IW',
            amount: 50000, // Amount in paise
            currency: 'INR',
            name: 'i-Kids',
            description: 'i-Kids Subscription Payment',
            order_id: data.order_id,
            handler: async (response) => {
                console.log(response);
                const res = await fetch(route('user.subscriptions.store'), {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });
                console.log(res);
                if (!res.ok) {
                    const errorData = await res.json();
                    if (errorData.message !== 'Subscription already in place.') {
                        toast.error('Failed to complete subscription', {
                            description: errorData.message || errorData.error || 'An error occurred while completing your subscription.',
                        });
                    } else {
                        toast.success('Subscription completed successfully!', {
                            description: 'Your subscription has been successfully created.',
                        });
                        router.visit(route('user.subscriptions.index'), {
                            preserveState: true,
                        });
                    }
                    return;
                } else {
                    toast.success('Subscription completed successfully!', {
                        description: 'Your subscription has been successfully created.',
                    });
                    router.visit(route('user.subscriptions.index'), {
                        preserveState: true,
                    });
                }
            },
        };

        const razorpayInstance = new Razorpay(options);
        await razorpayInstance.open();
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Subscription data:', formData);
        await handleRazorpayPayment();
        setOpen(false);
        toast.dismiss('subscription-processing');
        // Reset form or show success message
    };
    return (
        <div className="w-full">
            {/* <Button
                disabled={isLoading}
                onClick={() => {
                    handleRazorpayPayment();
                }}
                
            >
                Subscribe
            </Button> */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className={'w-full rounded-full py-6' + className}>Subscribe Now</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Delivery Address</DialogTitle>
                        <DialogDescription>Please provide your delivery address to complete your subscription.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">First Name *</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input
                                id="phone_number"
                                name="phone_number"
                                type="tel"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                placeholder="(555) 123-4567"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address *</Label>
                            <Textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder=""
                                className="min-h-[80px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required placeholder="Apt 4B" />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="postal_code">Postal Code *</Label>
                                <Input
                                    id="postal_code"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleInputChange}
                                    placeholder="10001"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter className="gap-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Complete Subscription</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubscriptionButton;
