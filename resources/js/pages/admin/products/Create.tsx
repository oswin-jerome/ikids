import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
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

const AdminProductsCreate = () => {
    const { data, setData, processing, errors, post, reset } = useForm({
        name: '',
        sku: '',
        description: '',
        type: 'single',
        selling_price: 0,
        actual_price: 0,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('admin.products.store'), {
                        preserveState: true,
                        onSuccess: () => {
                            toast.success('Product Added');
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
