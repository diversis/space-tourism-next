import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import Router from "next/router";
import Loader from "@/components/shared/Loader.svg";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { LoadingContext } from "@/components/shared/loading-context";
import { APP_WRAPPER_VARIANTS } from "@/lib/constants";

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     console.log(
    //         `\n--------------------\n RLY LOADIN? ${loading} \n--------------------\n`,
    //     );
    // }, [loading]);

    useEffect(() => {
        // Used for page transition
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <RWBProvider>
            <LoadingContext.Provider value={loading}>
                <Layout loading={loading}>
                    <MotionConfig reducedMotion="user">
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                            onExitComplete={() => window.scrollTo(0, 0)}
                        >
                            {loading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.1 },
                                    }}
                                    transition={{
                                        duration: 0.1,
                                        type: "tween",
                                        ease: "linear",
                                    }}
                                    variants={APP_WRAPPER_VARIANTS}
                                    className="grid h-full w-full grid-rows-[1fr] place-items-center "
                                >
                                    <Loader />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="main-wrap"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.3 },
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    className="grid h-full w-full grid-rows-[1fr] justify-items-center"
                                >
                                    <Component {...pageProps} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </MotionConfig>
                </Layout>
            </LoadingContext.Provider>
        </RWBProvider>
    );
}
