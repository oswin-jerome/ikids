import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import WebLayout from '@/layouts/web-layout';
import Features from '@/sections/Features';
import WhatIsSkippy from '@/sections/WhatIsSkippy';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <WebLayout>
            <Head title="Home" />

            <Carousel opts={{}}>
                <CarouselContent>
                    <CarouselItem>
                        <img src="/assets/images/Banner_1.jpg" className="min-h-[300px] object-cover" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="/assets/images/Banner_2.jpg" className="min-h-[300px] object-cover" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <WhatIsSkippy />
            <Features></Features>
        </WebLayout>
    );
}
