import { Product } from '@/types';
import Book from './Book';

const BooksBlock = ({ title, products }: { title: string; products: Product[] }) => {
    return (
        <section className="container py-10">
            <h3 className="text-3xl font-bold">{title}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((b) => {
                    return <Book product={b} key={'i_p_b_' + b.id}></Book>;
                })}
            </div>
        </section>
    );
};

export default BooksBlock;
