import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EyeIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: route('admin.users.index'),
    },
];

const CustomerList = ({ customers }: { customers: User[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer List" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((re) => {
                        return (
                            <TableRow>
                                <TableCell>{re.name}</TableCell>
                                <TableCell>{re.email}</TableCell>
                                <TableCell>
                                    <Link href={route('admin.users.show', re.id)}>
                                        <Button variant={'ghost'} size="icon">
                                            <EyeIcon />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </AppLayout>
    );
};

export default CustomerList;
