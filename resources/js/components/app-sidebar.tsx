import { AudioWaveform, BaggageClaim, Command, Frame, GalleryVerticalEnd, Map, PieChart, ShoppingCartIcon, ThumbsUp, Users2 } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import AppLogo from './app-logo';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Dashboard',
            url: route('dashboard'),
            icon: Frame,
            items: [],
            isActive: false,
        },
        {
            title: 'Customers',
            url: '#',
            icon: Users2,
            isActive: false,
            items: [
                {
                    title: 'Create Customer',
                    url: route('admin.subscribable-products.index'),
                },
                {
                    title: 'List Customers',
                    url: route('admin.users.index'),
                },
            ],
        },
        {
            title: 'Products',
            url: '#',
            icon: BaggageClaim,
            isActive: false,
            items: [
                {
                    title: 'List All',
                    url: route('admin.products.index'),
                },
                {
                    title: 'Create',
                    url: route('admin.products.create'),
                },
                {
                    title: 'Add Stock',
                    url: route('admin.stocks.create'),
                },
            ],
        },
        {
            title: 'Subscriptions',
            url: '#',
            icon: ThumbsUp,
            isActive: false,
            items: [
                {
                    title: 'List Subscribable Products',
                    url: route('admin.subscribable-products.index'),
                },
                {
                    title: 'Subscriptions',
                    url: route('admin.subscriptions.index'),
                },
            ],
        },
        {
            title: 'Orders',
            url: '#',
            icon: ShoppingCartIcon,
            isActive: false,
            items: [
                {
                    title: 'All Orders',
                    url: route('admin.orders.index'),
                },
                {
                    title: 'Pending Orders',
                    url: route('admin.orders.index', {
                        _query: {
                            status: 'pending',
                        },
                    }),
                },
                {
                    title: 'Processing Orders',
                    url: route('admin.orders.index', {
                        _query: {
                            status: 'processing',
                        },
                    }),
                },
                {
                    title: 'Canceled Orders',
                    url: route('admin.orders.index', {
                        _query: {
                            status: 'cancelled',
                        },
                    }),
                },
                {
                    title: 'Completed Orders',
                    url: route('admin.orders.index', {
                        _query: {
                            status: 'completed',
                        },
                    }),
                },
                {
                    title: 'Create Order',
                    url: route('admin.orders.create'),
                },
            ],
        },
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <AppLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
