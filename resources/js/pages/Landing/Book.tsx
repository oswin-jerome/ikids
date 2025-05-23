import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Book = () => {
    return (
        <Card className="gap-0 p-2">
            <CardHeader className="p-2">
                <img src="/assets/books/book1.png" className="rounded-lg" />
                <CardTitle className="mt-2">Wild Animals Book</CardTitle>
            </CardHeader>
            <CardContent className="m-0 flex items-center justify-between p-2">
                <p className="font-bold">Rs. 100</p>
                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <p className="text-sm text-green-500">Available</p>
                </div>
            </CardContent>
            <CardFooter className="p-2">
                <Button className="bg-secondary w-full rounded-full">Buy Now</Button>
            </CardFooter>
        </Card>
    );
};

export default Book;
