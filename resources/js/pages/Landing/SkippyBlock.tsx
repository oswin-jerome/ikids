import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';

const SkippyBlock = () => {
    return (
        <div>
            <h3 className="bg-primary p-4 text-center text-xl font-bold text-white md:text-2xl">Skippy - the Kids Activity Magazine</h3>
            <section className="container grid gap-10 py-10 md:grid-cols-[2fr_3fr] lg:gap-20 lg:py-20">
                <div>
                    <img alt="Book 1" src="/assets/books/book1.png" className="w-full rounded-lg" />
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Link href={route('skippy')} className="inline-block w-full">
                            <Button className="w-full py-6" variant={'subscribe'}>
                                Subscribe
                            </Button>
                        </Link>
                        <Button className="rounded-full py-6">View Sample</Button>
                    </div>
                    <p className="mt-6 text-center font-bold">Rs. 1000 / Year</p>
                </div>
                <div>
                    <h4 className="text-xl font-bold lg:text-2xl">March 2024 Issue Highlights</h4>
                    <ul className="mt-4 ml-3 list-disc space-y-2">
                        <li>Exciting DIY Science Experiments</li>
                        <li>Fun Match Puzzles and Brain Teasers</li>
                        <li>Creative Art Projects</li>
                        <li>Interactive Stories and Comics</li>
                        <li>Educational Games and Activities</li>
                    </ul>
                    <p className="mt-4 max-w-xl">
                        Each issue of Skippy is carefully crafted to make learning an adventure! With hands-on activities, fascinating facts, and
                        engaging content, your child will develop critical thinking skills while having fun.
                    </p>
                    <Card className="mt-10 pt-0">
                        <CardContent className="pt-0">
                            <Carousel className="mt-6">
                                <CarouselContent>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book1.png" className="object-cover" />
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book1.png" className="object-cover" />
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book1.png" className="object-cover" />
                                    </CarouselItem>
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book1.png" className="object-cover" />
                                    </CarouselItem>{' '}
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book1.png" className="object-cover" />
                                    </CarouselItem>{' '}
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <img src="/assets/books/book1.png" className="object-cover" />
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious className="hidden md:flex" />
                                <CarouselNext className="hidden md:flex" />
                            </Carousel>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default SkippyBlock;
