import Book from './Book';

const BooksBlock = ({ title }: { title: string }) => {
    const books = [1, 2, 3, 4, 5];
    return (
        <section className="container py-10">
            <h3 className="text-3xl font-bold">{title}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((b) => {
                    return <Book key={b}></Book>;
                })}
            </div>
        </section>
    );
};

export default BooksBlock;
