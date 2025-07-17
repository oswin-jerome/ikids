import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Product, ProductCategory } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('admin.products.index'),
    },
    {
        title: 'Create',
        href: route('admin.products.create'),
    },
];

const AdminProductsEdit = ({ categories, product }: { categories: ProductCategory[]; product: Product }) => {
    const { data, setData, processing, errors, put } = useForm<{
        name: string;
        sku: string;
        description: string;
        type: string;
        selling_price: number;
        actual_price: number;
        product_category_id: string | null;
        cover: File | null | undefined;
    }>({
        name: product.name,
        sku: product.sku,
        description: product.description,
        product_category_id: product.product_category_id?.toString() ?? 'null',
        type: product.type,
        selling_price: product.selling_price,
        actual_price: product.actual_price,
        cover: null,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    put(route('admin.products.update', product.id), {
                        onBefore: () => {
                            if (data.product_category_id === 'null') {
                                setData('product_category_id', null);
                            }
                        },
                        preserveState: true,
                        onSuccess: () => {
                            toast.warning('Product updated');
                            // router.
                        },
                    });
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                        <CardDescription>Add a new product</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <Label>SKU</Label>
                            <Input defaultValue={data.sku} onChange={(e) => setData('sku', e.target.value)} />
                            <InputError message={errors.sku} />
                        </div>
                        <div>
                            <Label>Name</Label>
                            <Input defaultValue={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Actual Price</Label>
                                <Input
                                    defaultValue={data.actual_price}
                                    type="number"
                                    onChange={(e) => setData('actual_price', e.target.valueAsNumber)}
                                />
                                <InputError message={errors.actual_price} />
                            </div>
                            <div>
                                <Label>Selling Price</Label>
                                <Input
                                    defaultValue={data.selling_price}
                                    type="number"
                                    onChange={(e) => setData('selling_price', e.target.valueAsNumber)}
                                />
                                <InputError message={errors.selling_price} />
                            </div>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea defaultValue={data.description} onChange={(e) => setData('description', e.target.value)} />
                            <InputError message={errors.description} />
                        </div>
                        <div>
                            <Label>Product Type</Label>
                            <Select defaultValue={data.type} onValueChange={(e) => setData('type', e)}>
                                <SelectTrigger>
                                    <SelectValue></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="combo">Combo</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} />
                        </div>
                        <div>
                            <Label>Category</Label>
                            <Select defaultValue={data.product_category_id ?? ''} onValueChange={(e) => setData('product_category_id', e)}>
                                <SelectTrigger>
                                    <SelectValue></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="null">UnCategorized</SelectItem>
                                    {categories.map((cat) => {
                                        return <SelectItem value={cat.id.toString()}>{cat.name}</SelectItem>;
                                    })}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.product_category_id} />
                        </div>
                        <div>
                            <Label>Cover Image</Label>
                            <Input type="file" onChange={(e) => setData('cover', e.target.files?.item(0))} />
                            <InputError message={errors.cover} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button> {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Save</Button>
                    </CardFooter>
                </Card>
            </form>
        </AppLayout>
    );
};

export default AdminProductsEdit;
