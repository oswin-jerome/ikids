import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WebLayout from '@/layouts/web-layout';
import { Product } from '@/types';
import { Head, Link } from '@inertiajs/react';

const ShopPage = ({ products }: { products: Product[] }) => {
    return (
        <WebLayout>
            <Head title="Shop" />
            <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                    return (
                        <Card className="overflow-clip pt-0">
                            <img alt="img" src="/assets/images/Banner_1.jpg" className="aspect-square object-cover" />
                            <CardContent>
                                <h4 className="font-bold">{product.name}</h4>
                                <p>{product.description}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <p>Rs. {product.selling_price}</p>
                                    <span className="text-sm italic line-through opacity-50">Rs. {product.actual_price}</span>
                                </div>
                                <Link href={route('shop.product', product.id)}>
                                    <Button className="mt-4 w-full">Buy Now</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </WebLayout>
    );
};

export default ShopPage;
