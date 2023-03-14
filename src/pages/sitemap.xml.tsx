import { NextApiRequest, NextApiResponse } from "next";

function generateSiteMap({ hostname }: { hostname: string }) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${hostname}</loc>
        </url>
        <url>
            <loc>${`${hostname}/destination`}</loc>
        </url>
        <url>
            <loc>${`${hostname}/crew`}</loc>
        </url>
        <url>
            <loc>${`${hostname}/technology`}</loc>
        </url>

    </urlset>
   `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    const hostname = `localhost:3000`;

    // Generate dynamic data for the sitemap
    //   const users = await prisma.user.findMany({
    //     select: {
    //       username: true,
    //     },
    //   });

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap({
        hostname,
    });

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
