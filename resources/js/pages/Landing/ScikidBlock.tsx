import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';

const ScikidBlock = () => {
    return (
        <div>
            <h3 className="bg-primary p-4 text-center text-xl font-bold text-white md:text-2xl">SciKids - the Science Magazine for Young Minds</h3>
            <section className="container grid gap-10 py-20 md:grid-cols-[3fr_2fr] lg:gap-20">
                <div>
                    <h4 className="text-xl font-bold lg:text-2xl">March 2024 Issue Highlights</h4>
                    <ul className="mt-4 ml-3 list-disc space-y-2">
                        <li>Journey Through Space: Exploring Black Holes</li>
                        <li>Fun Chemistry Experiments at Home</li>
                        <li>Meet Real Scientists and Their Discoveries</li>
                        <li>Amazing Facts About Animal Kingdom</li>
                        <li>Science News for Kids</li>
                    </ul>
                    <p className="mt-4 max-w-xl">
                        SciKids brings the fascinating world of science to young minds! Each issue is packed with exciting experiments, latest
                        scientific discoveries, and interviews with real cientists. Perfect for budding scientists aged 8-14 years.
                    </p>
                    <Card className="mt-10 pt-0">
                        <CardContent className="pt-0">
                            <Carousel className="mt-6">
                                <CarouselContent>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book2.png" className="object-cover" />
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book2.png" className="object-cover" />
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book2.png" className="object-cover" />
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book2.png" className="object-cover" />
                                    </CarouselItem>{' '}
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book2.png" className="object-cover" />
                                    </CarouselItem>{' '}
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book2.png" className="object-cover" />
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <img alt="Book 1" src="/assets/books/book2.png" className="w-full rounded-lg" />
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Link href={route('scikids')} className="inline-block w-full">
                            <Button className="w-full py-6" variant={'subscribe'}>
                                Subscribe
                            </Button>
                        </Link>
                        <Button className="rounded-full py-6">View Sample</Button>
                    </div>
                    <p className="mt-6 text-center font-bold">Rs. 1000 / Year</p>
                </div>
            </section>
        </div>
    );
};

export default ScikidBlock;
