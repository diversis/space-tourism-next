import { useEffect } from "react";
import type { ReactNode } from "react";
import Navbar from "./navbar";
import { useRouter } from "next/router";

import Head from "next/head";
import Stars from "./stars";
import { AnimatePresence, motion } from "framer-motion";
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
        <Meta/>
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

                
                <style>{`
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
                `}</style>
            </Head>
            <AnimatePresence>{!loading && <Stars />}</AnimatePresence>
            <Navbar />

            <main className="z-10 overflow-y-auto overflow-x-hidden [grid-area:2/1] ">
                {children}
            </main>
        </>
    );
}
