import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SubscribableProduct } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const AdminSubscribableProduct = ({ subscribableProduct }: { subscribableProduct: SubscribableProduct }) => {
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
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.subscribable-products.update', subscribableProduct.id), {
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
                            <Input type="number" defaultValue={data.price_per_month} onChange={(e) => setData('price_per_month', e.target.value)} />
                            <InputError message={errors.price_per_month} />
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
