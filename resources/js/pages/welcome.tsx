import SeoHead from '@/components/SeoHead';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import WebLayout from '@/layouts/web-layout';
import Features from '@/sections/Features';
import WhatIsSkippy from '@/sections/WhatIsSkippy';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <WebLayout>
            <SeoHead
                description="Online Children Bookstore - Buy books for kids online at low prices in India,Get best offers for Children Magazine subscriptions at i-kids.India's leading Magazine subscription company. Order online now. Special offers for libraries and schools"
                title="Buy Children's Book Online,Buy Children Magazine Subscription"
            />

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
