import { Footer2 } from '@/components/footer2';
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
            <nav className="container flex items-center justify-between py-4">
                <img src="/assets/images/logo.webp" className="max-w-24 lg:max-w-32" />
                <ul className="hidden items-center gap-12 lg:flex">
                    <li>
                        <Link href="#">Home</Link>
                    </li>
                    <li>
                        <Link href="#">Shop</Link>
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
                        <Link href="login">
                            <Button className="cursor-pointer" variant={'outline'}>
                                Login
                            </Button>
                        </Link>
                    )}
                    {auth.user != null && <Link href="dashboard">DB</Link>}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="lg:hidden">
                            <Button variant={'ghost'}>
                                <Menu />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-[300px] lg:min-w-lg">
                            <DropdownMenuLabel>Menu</DropdownMenuLabel>

                            <DropdownMenuItem>Home</DropdownMenuItem>
                            <DropdownMenuItem>Shop</DropdownMenuItem>
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
            {children}
            <Footer2 />
        </div>
    );
};

export default WebLayout;
