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

        const data = await res.json();

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
                await fetch(route('user.subscriptions.store'), {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({
                        subscribable_product_id: 1,
                        months: 1,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });
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
