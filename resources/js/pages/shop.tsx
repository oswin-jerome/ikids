import SeoHead from '@/components/SeoHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WebLayout from '@/layouts/web-layout';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';

const ShopPage = ({ products }: { products: Product[] }) => {
    return (
        <WebLayout>
            <SeoHead
                description="Online Children Bookstore - Buy books for kids online at low prices in India,Get best offers for Children Magazine subscriptions at i-kids.India's leading Magazine subscription company. Order online now. Special offers for libraries and schools"
                title="Shop"
            />
            <div className="container mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                    return (
                        <Card className="overflow-clip pt-0">
                            <img alt="img" src="/assets/images/Banner_1.jpg" className="aspect-[4/3] object-cover lg:aspect-square" />
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
