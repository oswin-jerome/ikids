import SeoHead from '@/components/SeoHead';
import { Button } from '@/components/ui/button';
import WebLayout from '@/layouts/web-layout';
import Subscribe from '@/sections/Subscribe';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <WebLayout>
            <SeoHead
                description="SKIPPY' is a monthly magazine designed especially for children aged 3-8 years! Each issue is filled with delightful stories, comics, engaging activities, and colorful illustrations to captivate young minds"
                title="Skippy - the Kids Activity Magazine"
                image="/assets/images/skippy_books_compressed.jpg"
            />
            <img src="/assets/images/skippy_banner.png" className="min-h-[300px] object-cover" />
            <h3 className="bg-primary p-4 text-center text-xl font-bold text-white md:text-2xl">Skippy - the Kids Activity Magazine</h3>

            <div className="container mt-20 grid gap-4 lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-2xl font-bold">What is Skippy?</h2>
                    <p>
                        SKIPPY' is a monthly magazine designed especially for children aged 3-8 years! Each issue is filled with delightful stories,
                        comics, engaging activities, and colorful illustrations to captivate young minds
                        <br />
                        <br /> I also Incluces theme-pasec activites, Tun Tacts, crals, ano much more to explore and learn.
                        <br />
                        <br />
                        Parents and children can enjoy bonding over educational games and interactive content that inspire curiosity and a love for
                        reading. Subscribe now to bring joy and learning to your child every month!
                    </p>
                    <div className="mt-10 space-x-4">
                        <Button className="rounded-full px-8 py-6">View Video</Button>
                        <Button variant={'secondary'} className="rounded-full px-8 py-6">
                            View Sample
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="/assets/images/skippy_books.png" />
                </div>
            </div>
            <section className="py-20">
                <img src="/assets/images/book_banner.png" alt="Image" />
                <div className="container mt-10">
                    <ul className="grid list-disc gap-4 p-4 md:grid-cols-2">
                        <li>
                            <h5 className="inline font-bold">Theme-Based Issues</h5> - Each issue explores a fun and engaging theme, making learning
                            exciting for kids.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Interactive Activities</h5> - Puzzles, mazes, and brain teasers designed to enhance
                            problem-solving skills.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Fun Crafts</h5> - Simple, hands-on crafts encourage creativity and fine motor skills.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Educational Content</h5> - Interesting facts and early learning concepts presented in a
                            kid-friendly way.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Colorful Illustrations</h5> - Bright and engaging visuals keep young readers entertained.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Sticker Surprises & Games</h5> - Special stickers and board games add an extra layer of
                            fun.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Parent-Child Bonding </h5> - Activities and stories encourage quality time between
                            parents and children.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Encourages Early Reading </h5> - Simple language and engaging content foster a love for
                            reading from a young age. and children.
                        </li>
                        <li>
                            <h5 className="inline font-bold">Exclusive Skippy & Diggy Adventures </h5> - Follow the lovable characters on new
                            adventures in every issue!
                        </li>
                    </ul>
                    <div className="mt-6 flex justify-center">
                        <Button variant={'subscribe'}>Subscribe Now</Button>
                    </div>
                </div>
            </section>
            <section>
                <Subscribe />
            </section>
        </WebLayout>
    );
}
