import SeoHead from '@/components/SeoHead';
import { Button } from '@/components/ui/button';
import WebLayout from '@/layouts/web-layout';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { toast } from 'sonner';

const ProductPage = ({ product }: { product: Product }) => {
    return (
        <WebLayout>
            <SeoHead description={product.description} title={product.name} image={product.cover} />
            <div className="container mt-20 gap-6 pb-10 lg:grid lg:grid-cols-[500px_auto]">
                <div className="grid place-items-center">
                    <img src={product.cover} className="aspect-[3/4] max-h-[50dvh] object-cover" />
                </div>{' '}
                <div className="flex h-full flex-col justify-between py-6">
                    <div>
                        <h1 className="text-xl font-bold">{product.name}</h1>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <div className="mt-2 flex items-center gap-2">
                            <p>Rs. {product.selling_price}</p>
                            <span className="text-sm italic line-through opacity-50">Rs. {product.actual_price}</span>
                        </div>
                        <Link
                            onSuccess={() => {
                                toast.success('Order Placed!!!');
                            }}
                            href={route('user.orders.store')}
                            method="post"
                            data={{ products: [product.id], quantities: [2] }}
                        >
                            <Button className="mt-4 w-full">Buy Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default ProductPage;
