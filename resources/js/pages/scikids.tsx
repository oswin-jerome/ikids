import SeoHead from '@/components/SeoHead';
import { Button } from '@/components/ui/button';
import WebLayout from '@/layouts/web-layout';
import Subscribe from '@/sections/Subscribe';
import { SubscribableProduct } from '@/types';

export default function Welcome({ subscribableProduct }: { subscribableProduct: SubscribableProduct }) {
    // const { auth } = usePage<SharedData>().props;

    return (
        <WebLayout>
            <SeoHead
                description="Scikids is an exciting magazine created especially for curious minds! each issue is packed with amazing facts, thrilling discoveries, and hands-on experiments that make science a fun-filled adventure with our friend Harvey!"
                title="SciKids - the Science Magazine for Young Minds"
                image="/assets/images/scikids_banner.png"
            />
            <img src="/assets/images/scikids_banner.png" className="min-h-[300px] object-cover" />
            <h3 className="bg-primary p-4 text-center text-xl font-bold text-white md:text-2xl">SciKids - the Science Magazine for Young Minds</h3>

            <div className="container mt-10 grid gap-4 lg:mt-20 lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-2xl font-bold">What is Scikids?</h2>
                    <p>
                        Scikids is an exciting magazine created especially for curious minds! each issue is packed with amazing facts, thrilling
                        discoveries, and hands-on experiments that make science a fun-filled adventure with our friend Harvey!
                    </p>
                    <div className="mt-10 space-x-4">
                        <Button className="rounded-full px-8 py-6">View Video</Button>
                        <Button variant={'secondary'} className="rounded-full px-8 py-6">
                            View Sample
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="/assets/images/scikids_books.png" />
                </div>
            </div>
            <section className="py-20">
                <img src="/assets/images/scikids_banner2.png" alt="Image" />
                <div className="container mt-10">
                    <ul className="grid list-disc gap-4 p-4 md:grid-cols-2">
                        <li>
                            <h5 className="inline font-bold"> Exciting Science Adventures </h5>- Each issue explores fascinating topics with fun
                            stories featuring Harvey.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Hands-On Experiments</h5> - Easy, kid-friendly experiments to try at home.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Amazing Facts </h5> - Fun and surprising science facts to spark curiosity.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Colorful Illustrations</h5> - Engaging visuals to make learning fun.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Interactive Puzzles & Games </h5> - Science-based activities to challenge young minds.
                        </li>
                        <li>
                            <h5 className="inline font-bold"> STEM Exploration </h5>- Covers topics like space, oceans, energy, and more!
                        </li>
                    </ul>
                    <div className="mt-6 flex justify-center">
                        <Button variant={'subscribe'}>Subscribe Now</Button>
                    </div>
                </div>
            </section>
            <section>
                <Subscribe subscribableProduct={subscribableProduct} id="2" />
            </section>
        </WebLayout>
    );
}
