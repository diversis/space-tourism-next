import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader.svg";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { LoadingContext } from "@/components/shared/loading-context";
import { APP_WRAPPER_VARIANTS } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Used for page transition
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        router.events.on("routeChangeStart", start);
        router.events.on("routeChangeComplete", end);
        router.events.on("routeChangeError", end);
        return () => {
            router.events.off("routeChangeStart", start);
            router.events.off("routeChangeComplete", end);
            router.events.off("routeChangeError", end);
        };
    }, [router.events]);

    return (
        <RWBProvider>
            <LoadingContext.Provider value={loading}>
                <Layout loading={loading}>
                    <MotionConfig reducedMotion="user">
                        <AnimatePresence
                            mode="popLayout"
                            initial={false}
                            onExitComplete={() => window.scrollTo(0, 0)}
                        >
                            {loading && (
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
                                    className="absolute inset-0 grid grid-rows-[1fr] place-items-center "
                                >
                                    <Loader />
                                </motion.div>
                            )}
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
                                className="flex h-full w-full flex-col items-center"
                            >
                                <Component {...pageProps} />
                            </motion.div>
                        </AnimatePresence>
                    </MotionConfig>
                </Layout>
            </LoadingContext.Provider>
            <Analytics />
        </RWBProvider>
    );
}
