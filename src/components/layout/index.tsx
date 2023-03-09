import { useEffect } from "react";
import type { ReactNode } from "react";
import Navbar from "./navbar";
import { useRouter } from "next/router";

import Head from "next/head";
import Stars from "./stars";

export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
    let path = router.pathname;
    if (path === "/") path = "home";

    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="solution to Frontend Mentor challenge Space tourism multi-page website"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon-32x32.png" />
                <style>{`
                    body {
                        background-image: url("/image/${path.replace(
                            "/",
                            "",
                        )}/background-${path.replace("/", "")}-mobile.jpg");
                    }

                    @media screen and (min-width: 768px) {
                        body {
                            background-image: url("/image/${path.replace(
                                "/",
                                "",
                            )}/background-${path.replace("/", "")}-tablet.jpg");
                        }
                    }

                    @media screen and (min-width: 1280px) {
                        body {
                            background-image: url("/image/${path.replace(
                                "/",
                                "",
                            )}/background-${path.replace(
                    "/",
                    "",
                )}-desktop.jpg");
                        }
                    }
                `}</style>
            </Head>
            <Stars></Stars>
            <Navbar />
            <main
                id="main"
                className="grid h-full grid-rows-[1fr] justify-items-center "
            >
                {children}
            </main>
        </>
    );
}
