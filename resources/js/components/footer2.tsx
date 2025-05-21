import { Link } from '@inertiajs/react';

interface MenuItem {
    title: string;
    links: {
        text: string;
        url: string;
    }[];
}

interface Footer2Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    tagline?: string;
    menuItems?: MenuItem[];
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
}

const Footer2 = ({
    logo = {
        src: '/assets/images/logo.webp',
        alt: 'i Kids Logo',
        title: 'S',
        url: '/',
    },
    tagline = 'Nurturing young minds through engaging educational content and fun learning experience',
    menuItems = [
        {
            title: 'Quick Links',
            links: [
                { text: 'About Us', url: '#' },
                { text: 'Our Products', url: '#' },
                { text: 'Subscription Plans', url: '#' },
                { text: 'School Programs', url: '#' },
                { text: 'Blogs', url: '#' },
            ],
        },
        {
            title: 'Support',
            links: [
                { text: 'FAQ', url: '#' },
                { text: 'Contact Us', url: '#' },
                { text: 'Shipping Policy', url: '#' },
                { text: 'Returns', url: '#' },
                { text: 'Privacy Policy', url: '#' },
            ],
        },
        {
            title: 'Contact',
            links: [
                { text: 'Twitter', url: '#' },
                { text: 'Instagram', url: '#' },
                { text: 'LinkedIn', url: '#' },
            ],
        },
    ],
    copyright = '© 2024 i-kids.com. All rights reserved.',
    bottomLinks = [
        { text: 'Terms and Conditions', url: '#' },
        { text: 'Privacy Policy', url: '#' },
    ],
}: Footer2Props) => {
    return (
        <section className="bg-foreground text-background mt-10 py-20">
            <div className="container">
                <footer>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
                        <div className="col-span-2 mb-8 lg:mb-0">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <Link href="/">
                                    <img src={logo.src} alt={logo.alt} title={logo.title} className="w-20 lg:w-32" />
                                </Link>
                            </div>
                            <p className="mt-4 text-sm">{tagline}</p>
                        </div>
                        <div className="hidden lg:block"></div>
                        {menuItems.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">{section.title}</h3>
                                <ul className="text-muted-foreground space-y-4">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx} className="hover:text-primary font-medium">
                                            <a href={link.url}>{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
                        <p>{copyright}</p>
                        <ul className="flex gap-4">
                            {bottomLinks.map((link, linkIdx) => (
                                <li key={linkIdx} className="hover:text-primary underline">
                                    <a href={link.url}>{link.text}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export { Footer2 };
