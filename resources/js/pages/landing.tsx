import SeoHead from '@/components/SeoHead';
import { Testimonial14 } from '@/components/testimonial14';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import WebLayout from '@/layouts/web-layout';
import BooksBlock from './Landing/BooksBlock';
import ScikidBlock from './Landing/ScikidBlock';
import SkippyBlock from './Landing/SkippyBlock';

export default function Landing() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <WebLayout>
            <SeoHead
                description="Online Children Bookstore - Buy books for kids online at low prices in India,Get best offers for Children Magazine subscriptions at i-kids.India's leading Magazine subscription company. Order online now. Special offers for libraries and schools"
                title="Buy Children's Book Online,Buy Children Magazine Subscription"
            />

            <Carousel opts={{}}>
                <CarouselContent>
                    <CarouselItem className="relative isolate">
                        <img src="/assets/images/Banner_1.jpg" className="min-h-[300px] object-cover" />
                        <div className="absolute right-0 bottom-10 left-0 z-10 container">
                            <Button variant={'subscribe'}>Subscribe Now</Button>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <img src="/assets/images/Banner_2.jpg" className="min-h-[300px] object-cover" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="hidden" />
            </Carousel>
            <SkippyBlock />
            <ScikidBlock />
            <Separator />
            <BooksBlock title="Activity Books" />
            <div className="bg-accent">
                <Testimonial14 />
            </div>
        </WebLayout>
    );
}
