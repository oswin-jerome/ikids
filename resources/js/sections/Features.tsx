import { Button } from '@/components/ui/button';

const Features = () => {
    return (
        <section className="mt-20">
            <img src="/assets/images/Banner_1.jpg" alt="Image" />
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
                        <h5 className="inline font-bold">Sticker Surprises & Games</h5> - Special stickers and board games add an extra layer of fun.
                    </li>
                    <li>
                        <h5 className="inline font-bold">Parent-Child Bonding </h5> - Activities and stories encourage quality time between parents
                        and children.
                    </li>
                    <li>
                        <h5 className="inline font-bold">Encourages Early Reading </h5> - Simple language and engaging content foster a love for
                        reading from a young age. and children.
                    </li>
                    <li>
                        <h5 className="inline font-bold">Exclusive Skippy & Diggy Adventures </h5> - Follow the lovable characters on new adventures
                        in every issue!
                    </li>
                </ul>
                <div className="mt-6 flex justify-center">
                    <Button variant={'subscribe'}>Subscribe Now</Button>
                </div>
            </div>
        </section>
    );
};

export default Features;
