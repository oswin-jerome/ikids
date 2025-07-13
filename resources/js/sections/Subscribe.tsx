'use client';

import SubscriptionButton from '@/components/subscription-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function Subscribe({ id }: { id: string }) {
    const plans = [
        {
            id: '3-months',
            duration: 3,
            price: 250,
            originalPrice: 250,
            savings: 0,
            popular: false,
            description: 'Perfect for casual readers',
        },
        {
            id: '6-months',
            duration: 6,
            price: 450,
            originalPrice: 500,
            savings: 50,
            popular: false,
            description: 'Perfect for casual readers',
        },

        {
            id: '12-months',
            duration: 12,
            price: 850,
            originalPrice: 100,
            savings: 150,
            popular: true,
            description: 'Best value for book lovers',
        },
    ];

    return (
        <div className="bg-accent min-h-screen p-4 md:p-16">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Choose your subscription type</h1>
                    <p className="mx-auto max-w-2xl text-xl text-slate-600">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur quaerat perferendis voluptates quas? Minus, eius nemo
                    </p>
                </div>

                <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`relative cursor-pointer transition-all duration-300 ${plan.popular ? 'border-blue-200 bg-gradient-to-br from-white to-blue-50' : 'bg-white'}`}
                        >
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-blue-500 hover:bg-blue-600">
                                    <Star className="mr-1 h-3 w-3" />
                                    Most Popular
                                </Badge>
                            )}

                            <CardHeader className="pb-4 text-center">
                                <CardTitle className="text-3xl font-bold text-slate-900">{plan.duration} Months</CardTitle>
                                <CardDescription className="text-lg text-slate-600">{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="pb-8 text-center">
                                <div className="mb-0">
                                    <div className="mb-3 flex items-center justify-center gap-3">
                                        <span className="text-5xl font-bold text-slate-900">₹{plan.price}</span>
                                        <span className="text-xl text-slate-500 line-through">₹{plan.originalPrice}</span>
                                    </div>
                                    <div className="mb-2 text-lg font-semibold text-blue-600">
                                        Save ₹{plan.savings} ({Math.round((plan.savings / plan.originalPrice) * 100)}% off)
                                    </div>
                                    <div className="text-slate-500">₹{Math.round(plan.price / plan.duration)} per month</div>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <SubscriptionButton
                                    className={`w-full py-6 font-semibold transition-all duration-200 hover:shadow-xl ${
                                        plan.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-900 hover:bg-slate-800'
                                    }`}
                                    productId={id}
                                    months={plan.duration}
                                />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
