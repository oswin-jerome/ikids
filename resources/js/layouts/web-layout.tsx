import { Footer2 } from '@/components/footer2';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { ReactNode } from 'react';

const WebLayout = ({ children }: { children: ReactNode }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <div>
            <div className="bg-background sticky top-0 z-50 shadow">
                <nav className="py-1- container flex items-center justify-between">
                    <img src="/assets/images/logo.webp" className="max-w-24 lg:max-w-32" />
                    <ul className="container hidden items-center gap-12 p-4 lg:flex">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href={route('shop')}>Shop</Link>
                        </li>
                        <li>
                            <Link href="#">Schools</Link>
                        </li>
                        <li>
                            <Link href="#">FAQs</Link>
                        </li>
                        <li>
                            <Link href="#">Blogs</Link>
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <Button className="hidden lg:inline" variant={'subscribe'}>
                            Subscribe
                        </Button>
                        {auth.user == null && (
                            <Link href={route('login')}>
                                <Button className="cursor-pointer" variant={'outline'}>
                                    Login
                                </Button>
                            </Link>
                        )}
                        {auth.user != null && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className="bg-red-300" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="min-w-[300px] lg:min-w-lg">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <Link href={route('user.profile')}>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                    </Link>
                                    <Link href={route('user.password')}>
                                        <DropdownMenuItem>Change Password</DropdownMenuItem>
                                    </Link>
                                    <Link href={route('user.orders')}>
                                        <DropdownMenuItem>Orders</DropdownMenuItem>
                                    </Link>
                                    <Link href={route('user.subscriptions')}>
                                        <DropdownMenuItem>Subscriptions</DropdownMenuItem>
                                    </Link>
                                    <Link method="post" href={route('logout')} className="w-full">
                                        <DropdownMenuItem>Logout</DropdownMenuItem>
                                    </Link>
                                    {auth.user && auth.user.role == 'admin' && (
                                        <Link href={route('dashboard')}>
                                            <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                                        </Link>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="lg:hidden">
                                <Button variant={'ghost'}>
                                    <Menu />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-[300px] lg:min-w-lg">
                                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                <Link href="/">
                                    <DropdownMenuItem>Home</DropdownMenuItem>
                                </Link>
                                <Link href={route('shop')}>
                                    <DropdownMenuItem>Shop</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>Schools</DropdownMenuItem>
                                <DropdownMenuItem>FAQs</DropdownMenuItem>
                                <DropdownMenuItem>Blogs</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Orders</DropdownMenuItem>
                                <DropdownMenuItem>Subscriptions</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </nav>
            </div>
            {children}
            <Footer2 />
        </div>
    );
};

export default WebLayout;
