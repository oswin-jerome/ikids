import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Product, SubscribableProduct } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const AdminSubscribableProduct = ({ subscribableProduct, products }: { subscribableProduct: SubscribableProduct; products: Product[] }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Subscribable Products',
            href: route('admin.subscribable-products.index'),
        },
        {
            title: subscribableProduct.name,
            href: route('admin.subscribable-products.show', subscribableProduct.id),
        },
    ];

    const { data, setData, errors, put } = useForm({
        name: subscribableProduct.name,
        price_per_month: subscribableProduct.price_per_month,
        description: subscribableProduct.description,
        slug: subscribableProduct.slug,
        sku: subscribableProduct.sku,
        is_active: subscribableProduct.is_active,
        product_id: subscribableProduct.product_id,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.subscribable-products.update', subscribableProduct.id), {
            onBefore: () => {
                if (data.product_id === 0) {
                    setData('product_id', undefined);
                }
            },
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Subscribable Product updated successfully');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product List" />
            <Card>
                <CardHeader>
                    <CardTitle>Manage Subscribable Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div>
                            <Label>Name</Label>
                            <Input defaultValue={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea defaultValue={data.description} onChange={(e) => setData('description', e.target.value)} />
                            <InputError message={errors.description} />
                        </div>
                        <div>
                            <Label>Slug</Label>
                            <Input defaultValue={data.slug} onChange={(e) => setData('slug', e.target.value)} />
                            <InputError message={errors.slug} />
                        </div>
                        <div>
                            <Label>SKU</Label>
                            <Input defaultValue={data.sku} onChange={(e) => setData('sku', e.target.value)} />
                            <InputError message={errors.sku} />
                        </div>
                        <div>
                            <Label>Price Per Month</Label>
                            <Input
                                type="number"
                                defaultValue={data.price_per_month}
                                onChange={(e) => setData('price_per_month', e.target.valueAsNumber)}
                            />
                            <InputError message={errors.price_per_month} />
                        </div>
                        <div>
                            <Label>Product</Label>
                            <Select defaultValue={data.product_id?.toString() ?? '0'} onValueChange={(e) => setData('product_id', parseInt(e))}>
                                <SelectTrigger>
                                    <SelectValue></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">------</SelectItem>
                                    {products.map((product) => {
                                        return <SelectItem value={product.id.toString()}>{product.name}</SelectItem>;
                                    })}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.is_active} />
                        </div>
                        <div>
                            <Label>Is Active</Label>
                            <Switch
                                className="block"
                                defaultChecked={data.is_active}
                                onCheckedChange={(e) => setData('is_active', e ? true : false)}
                            />
                            <InputError message={errors.is_active} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div>
                        <Button onClick={handleSubmit}>Save</Button>
                    </div>
                </CardFooter>
            </Card>
        </AppLayout>
    );
};

export default AdminSubscribableProduct;
