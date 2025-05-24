'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const testimonials = [
    {
        id: 'testimonial-1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
        name: 'Customer Name',
        role: 'Position at Company',
        avatar: 'https://shadcnblocks.com/images/block/avatar-1.webp',
    },
    {
        id: 'testimonial-2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
        name: 'Customer Name',
        role: 'Position at Company',
        avatar: 'https://shadcnblocks.com/images/block/avatar-2.webp',
    },
    {
        id: 'testimonial-3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.',
        name: 'Customer Name',
        role: 'Position at Company',
        avatar: 'https://shadcnblocks.com/images/block/avatar-3.webp',
    },
];

const Testimonial14 = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        const updateCurrent = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on('select', updateCurrent);
        return () => {
            api.off('select', updateCurrent);
        };
    }, [api]);

    return (
        <section className="container py-10">
            <h3 className="mb-10 text-center text-xl font-bold lg:text-3xl">What Parents & Teachers Say</h3>
            <Carousel setApi={setApi}>
                <CarouselContent>
                    {testimonials.map((testimonial) => (
                        <CarouselItem key={testimonial.id}>
                            <div className="container flex flex-col items-center text-center">
                                <p className="mb-8 max-w-4xl font-medium md:px-8 lg:text-xl">&ldquo;{testimonial.text}&rdquo;</p>
                                <Avatar className="mb-2 size-12 md:size-24">
                                    <AvatarImage src={testimonial.avatar} />
                                    <AvatarFallback>{testimonial.name}</AvatarFallback>
                                </Avatar>
                                <p className="mb-1 text-sm font-medium md:text-lg">{testimonial.name}</p>
                                <p className="text-muted-foreground mb-2 text-sm md:text-lg">{testimonial.role}</p>
                                <div className="mt-2 flex items-center gap-0.5">
                                    <Star className="fill-primary size-5 stroke-none" />
                                    <Star className="fill-primary size-5 stroke-none" />
                                    <Star className="fill-primary size-5 stroke-none" />
                                    <Star className="fill-primary size-5 stroke-none" />
                                    <Star className="fill-primary size-5 stroke-none" />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="hidden md:flex" />
                <CarouselPrevious className="hidden md:flex" />
            </Carousel>
            <div className="container flex justify-center py-6">
                {testimonials.map((testimonial, index) => (
                    <Button
                        key={testimonial.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            api?.scrollTo(index);
                        }}
                    >
                        <div className={`size-2.5 rounded-full ${index === current ? 'bg-primary' : 'bg-input'}`} />
                    </Button>
                ))}
            </div>
        </section>
    );
};

export { Testimonial14 };
