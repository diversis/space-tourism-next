import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { AnimatePresence, motion } from "framer-motion";
import Explore from "@/lib/buttons/explore";

export default function Home() {
    return (
        <>
            <Head>
                <title>Frontend Mentor | Space tourism - Home</title>
            </Head>

            <div className="container grid h-full grid-cols-1 grid-rows-home place-items-end justify-items-start overflow-y-clip px-6 lg:px-24 xl:grid-cols-2 xl:px-40">
                <article className="text-center xl:text-left">
                    <h5 className="tracking-widest text-accent">
                        So, you want to travel to
                    </h5>
                    <h1 className="spicy mb-[0.15em] w-full bg-conic bg-[size:800%+800%] bg-no-repeat">
                        Space
                    </h1>
                    <p className="text-shadow max-w-[46ch] text-accent">
                        <Balancer ratio={0.5}>
                            Let’s face it; if you want to go to space, you might
                            as well genuinely go to outer space and not hover
                            kind of on the edge of it. Well sit back, and relax
                            because we’ll give you a truly out of this world
                            experience!
                        </Balancer>
                    </p>
                </article>

                <div className="relative h-min w-min justify-self-end ">
                    <Explore />
                </div>
            </div>
        </>
    );
}
