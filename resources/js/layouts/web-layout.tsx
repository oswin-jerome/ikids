import { Footer2 } from '@/components/footer2';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Toaster } from '@/components/ui/sonner';
import { UserInfo } from '@/components/user-info';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, ShoppingCart } from 'lucide-react';
import { ReactNode } from 'react';
import MagazineNav from './MagazineNav';

const WebLayout = ({ children }: { children: ReactNode }) => {
    const { auth, cartCount } = usePage<SharedData>().props;

    return (
        <div>
            <Toaster richColors />

            <div className="bg-background sticky top-0 z-50 shadow">
                <nav className="py-1- container flex items-center justify-between">
                    <img src="/assets/images/logo.webp" className="max-w-24 lg:max-w-32" />
                    <ul className="container hidden items-center gap-12 p-4 lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList className="space-x-4">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href={route('home')}>Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href={route('shop')}>Shop</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">Schools</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="font-normal">Magazines</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="w-[300px]">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link href={route('skippy')}>
                                                        <p className="font-bold">Skippy</p>
                                                        <p className="text-slate-500">Skippy - the Kids Activity Magazine</p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link href={route('scikids')}>
                                                        <p className="font-bold">Scikids</p>
                                                        <p className="text-slate-500">SciKids - the Science Magazine for Young Minds</p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">FAQs</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="#">Blogs</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
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
                        <Link href={route('user.cart')}>
                            <Button variant={'ghost'} size={'icon'} className="relative">
                                <div className="absolute top-0 right-0 h-4 min-w-4 rounded-full bg-red-700 text-xs text-white">{cartCount}</div>
                                <ShoppingCart />
                            </Button>
                        </Link>
                        {auth.user != null && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <UserInfo user={auth.user} />
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
                                    <Link href={route('user.subscriptions.index')}>
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
                            <DropdownMenuTrigger className="lg:hidden" asChild>
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
                                <MagazineNav />

                                <DropdownMenuItem>FAQs</DropdownMenuItem>
                                <DropdownMenuItem>Blogs</DropdownMenuItem>
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
