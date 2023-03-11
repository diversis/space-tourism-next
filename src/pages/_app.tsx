import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import Router from "next/router";
import Loader from "@/components/shared/Loader.svg";
import { AnimatePresence, backIn, motion } from "framer-motion";
import { LoadingContext } from "@/components/shared/loading-context";

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

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
            <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
                <LoadingContext.Provider value={loading}>
                    <Layout>
                        {loading ? (
                            <div className="grid h-full w-full grid-rows-[1fr] place-items-center">
                                <Loader />
                            </div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    type: "tween",
                                    ease: "backIn",
                                }}
                                className="grid h-full w-full grid-rows-[1fr] justify-items-center"
                            >
                                <Component {...pageProps} />
                            </motion.div>
                        )}
                    </Layout>
                </LoadingContext.Provider>
            </AnimatePresence>
        </RWBProvider>
    );
}
