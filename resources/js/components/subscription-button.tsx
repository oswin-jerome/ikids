import { RazorpayOrderOptions, useRazorpay } from 'react-razorpay';
import { Button } from './ui/button';

const SubscriptionButton = () => {
    const { Razorpay } = useRazorpay();
    const handleRazorpayPayment = async () => {
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
        if (!csrfMetaTag || !csrfMetaTag.content) {
            throw new Error('CSRF token meta tag not found');
        }
        const csrfToken = csrfMetaTag.content;
        const res = await fetch(route('user.subscriptions.create_order'), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({
                subscribable_product_id: 1,
                months: 1,
            }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            alert(errorData.message || 'Failed to create order');
            throw new Error('Failed to create order');
        }

        const data = await res.json();
        if (data.order_id === undefined) {
            alert(data.message || 'Order ID not found');
            throw new Error('Order ID not found in response');
        }
        const options: RazorpayOrderOptions = {
            key: 'rzp_test_Wok0nv9mU8B1IW',
            amount: 50000, // Amount in paise
            currency: 'INR',
            name: 'i-Kids',
            description: 'i-Kids Subscription Payment',
            order_id: data.order_id,
            callback_url: route('api.razorpay.subscription.callback'),
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
                    alert(errorData.message || errorData.error || 'Failed to complete subscription');
                    throw new Error('Failed to complete subscription');
                }
            },
        };

        const razorpayInstance = new Razorpay(options);
        await razorpayInstance.open();
    };

    return (
        <Button
            onClick={() => {
                handleRazorpayPayment();
            }}
            className="rounded-full py-6"
        >
            Subscribe
        </Button>
    );
};

export default SubscriptionButton;
