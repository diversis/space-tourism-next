import type { ReactNode } from "react";
import Navbar from "./navbar";
import { useRouter } from "next/router";

import Head from "next/head";
import Stars from "./stars";
import { AnimatePresence } from "framer-motion";
import Meta from "./meta";

export default function Layout({
    children,
    loading,
}: {
    children: ReactNode;
    loading: boolean;
}) {
    const router = useRouter();
    let path = router.pathname.toLowerCase();
    if (path === "/") path = "/home";

    return (
        <>
            <Meta />
            <Head>
                <meta
                    name="description"
                    content="solution to Frontend Mentor challenge Space tourism multi-page website"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <title>
                    {`Frontend Mentor | Space tourism - ${
                        path.slice(1, 2).toUpperCase() + path.slice(2)
                    }`}
                </title>

                <style>
                    {path === "/404"
                        ? `
                body {
                    background-image: url(/image/404.png);
                }
                `
                        : `
                    body {
                        background-image: url(/image/${path.replace(
                            "/",
                            "",
                        )}/background-${path.replace("/", "")}-mobile.jpg);
                    }

                    @media screen and (min-width: 768px) {
                        body {
                            background-image: url(/image/${path.replace(
                                "/",
                                "",
                            )}/background-${path.replace("/", "")}-tablet.jpg);
                        }
                    }

                    @media screen and (min-width: 1280px) {
                        body {
                            background-image: url(/image/${path.replace(
                                "/",
                                "",
                            )}/background-${path.replace("/", "")}-desktop.jpg);
                        }
                    }
                `}
                </style>
            </Head>
            <AnimatePresence>{!loading && <Stars />}</AnimatePresence>
            <a
                href="#main"
                className="absolute z-[9000] mx-auto -translate-y-full bg-white py-2 px-4 transition-transform focus:translate-y-0"
            >
                Skip to content
            </a>
            <Navbar />

            <main
                id="main"
                className="z-10 w-full overflow-y-auto overflow-x-hidden [grid-area:2/1] "
            >
                {children}
            </main>
            <div className="fixed right-0 bottom-0 z-[1000] mx-auto flex translate-y-full bg-white py-2 px-4 transition-transform focus-within:translate-y-0">
                <p className="pb-4 text-sm">
                    {" "}
                    Challenge by
                    <a
                        href="https://www.frontendmentor.io?ref=challenge"
                        target="_blank"
                        className="mx-2 underline"
                    >
                        Frontend Mentor
                    </a>
                    Coded by
                    <a
                        href="https://github.com/diversis/space-tourism-next"
                        target="_blank"
                        className="ml-2 underline"
                    >
                        diversis
                    </a>
                    .
                </p>
            </div>
        </>
    );
}
