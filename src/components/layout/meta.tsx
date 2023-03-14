import Head from "next/head";
import { useRouter } from "next/router";

const DOMAIN = "https://url-shortening-api-nine.vercel.app";

export default function Meta({
    title = "Frontend Mentor | Space tourism",
    description = "Solution to 'Frontend Mentor' challenge: 'Space tourism multi-page website'",
    image = `${DOMAIN}/image/home/background-home-desktop.jpg`,
}: {
    title?: string;
    description?: string;
    image?: string;
}) {
    return (
        <Head>
            <link rel="icon" href="/favicon-32x32.png" />

            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta itemProp="image" content={image} />
            <meta
                property="og:logo"
                content={`${DOMAIN}/favicon-32x32.png`}
            ></meta>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@frontendmentor" />
            <meta name="twitter:creator" content="@d1v3r515" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
