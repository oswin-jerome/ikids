import { Head } from '@inertiajs/react';

const SeoHead = ({ title, description, image = '/assets/images/logo.webp' }: { title: string; description: string; image?: string }) => {
    return (
        <Head title={title}>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="twitter:image" content={image} />

            <meta property="og:url" content="https://i-kids.in/" />
            <meta property="twitter:url" content="https://i-kids.in/" />
        </Head>
    );
};

export default SeoHead;
