import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';

const Book = ({ product }: { product: Product }) => {
    return (
        <Card className="gap-0 p-2">
            <CardHeader className="p-2">
                <img src={product.cover} className="aspect-square rounded-lg object-cover" />
                <CardTitle className="mt-2">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="m-0 flex items-center justify-between p-2">
                <p className="font-bold">Rs. {product.selling_price}</p>
                {product.current_stock > 0 ? (
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-green-500"></div>
                        <p className="text-sm text-green-500">Available</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-red-500"></div>
                        <p className="text-sm text-red-500">Out of stock</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-2">
                <Link href={route('shop.product', product.slug)} className="block w-full">
                    <Button disabled={product.current_stock <= 0} className="bg-secondary w-full rounded-full">
                        Buy Now
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default Book;
