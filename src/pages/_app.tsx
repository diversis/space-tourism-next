import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as RWBProvider } from "react-wrap-balancer";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <RWBProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </RWBProvider>
    );
}
