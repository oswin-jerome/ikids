import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    cartCount: number;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Product {
    id: number;
    current_stock: number;
    sku: string;
    slug: string;
    name: string;
    description: string;
    type: string;
    actual_price: number;
    selling_price: number;
    created_at: Date;
    updated_at: Date;

    cover: string;
}

export interface Order {
    id: number;
    order_id: string;
    user_id: number;
    type: string;
    status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
    payment_status: 'pending' | 'completed' | 'failed';
    total_amount: string;
    created_at: Date;
    updated_at: Date;

    first_name: string;
    last_name: string;
    address: string;
    postal_code: string;
    city: string;
    phone_number: string;

    razorpay_payment_id?: string;

    customer?: User;
    orderItems: Product[];
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
    product: Product;

    // FOR ORDER ITEMS
    price: number;
}
export interface Cart {
    id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    sub_total: number;
    tax: number;
    shipping: number;
    total: number;
}
