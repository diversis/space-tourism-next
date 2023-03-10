import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Explore from "@/lib/buttons/explore";

export default function Home() {
    const h5Text = "So, you want to travel to";
    const h1Text = "Space";
    const longText =
        "Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!";

    const sentence: Variants = {
        hidden: {
            opacity: 1,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };
    const letter: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };
    const article: Variants = {
        hidden: {
            opacity: 1,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.005,
                delay: 10,
                when: "beforeChildren",
            },
        },
    };
    const title: Variants = {
        hidden: {
            mask: "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
            maskPosition: "80% 0%",
            maskSize: "800%",
            WebkitMask:
                "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
            WebkitMaskPosition: "80% 0%",
            WebkitMaskSize: "800%",
            opacity: 1,
        },
        visible: {
            opacity: 1,

            maskPosition: "45% 0%",

            WebkitMaskPosition: "45% 0%",

            transition: {
                duration: 10,
                type: "tween",
                ease: "easeOut",
                delay: 2,
                // times: [0, 0.2, 0.3, 1],
            },
        },
    };
    return (
        <>
            <Head>
                <title>Frontend Mentor | Space tourism - Home</title>
            </Head>

            <div className="container grid h-full grid-cols-1 grid-rows-home place-items-end justify-items-start overflow-y-clip px-6 lg:px-24 xl:grid-cols-2 xl:px-40">
                <motion.article
                    className="text-center xl:text-left"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h5
                        className="tracking-widest text-accent"
                        variants={sentence}
                    >
                        {h5Text &&
                            h5Text.split("").map((char, index) => {
                                return (
                                    <motion.span
                                        key={char + "-" + index}
                                        variants={letter}
                                    >
                                        {char}
                                    </motion.span>
                                );
                            })}
                    </motion.h5>
                    <motion.h1
                        variants={title}
                        className="spicy linear-mask relative mb-[0.15em] w-full bg-conic bg-[size:800%+800%] bg-no-repeat"
                    >
                        {h1Text}
                    </motion.h1>
                    <motion.p
                        className="text-shadow max-w-[46ch] text-accent"
                        variants={article}
                    >
                        <Balancer ratio={0.5}>
                            {longText &&
                                longText.split("").map((char, index) => {
                                    return (
                                        <motion.span
                                            key={char + "-" + index}
                                            variants={letter}
                                        >
                                            {char}
                                        </motion.span>
                                    );
                                })}
                        </Balancer>
                    </motion.p>
                </motion.article>

                <div className="relative h-min w-min justify-self-end ">
                    <Explore />
                </div>
            </div>
        </>
    );
}
