import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import SearchProduct from './SearchProduct';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create',
        href: route('admin.stocks.create'),
    },
];

const AdminProductsCreate = () => {
    const { data, setData, processing, errors, post, reset } = useForm<{
        stock: number;
        product_id: number | null;
    }>({
        stock: 0,
        product_id: null,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('admin.stocks.store'), {
                        preserveState: true,
                        onSuccess: () => {
                            toast.success('Stock Added');
                            // router.
                            reset('product_id', 'stock');
                        },
                    });
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Add Stock</CardTitle>
                        <CardDescription>Add a new stock</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <Label>Product</Label>
                            <SearchProduct
                                val={data.product_id}
                                onChange={(val) => {
                                    setData('product_id', val);
                                }}
                            ></SearchProduct>
                            <InputError message={errors.product_id} />
                        </div>
                        <div>
                            <Label>Stock</Label>
                            <Input value={data.stock} type="number" onChange={(e) => setData('stock', e.target.valueAsNumber)} />
                            <InputError message={errors.stock} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button> {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Create</Button>
                    </CardFooter>
                </Card>
            </form>
        </AppLayout>
    );
};

export default AdminProductsCreate;
