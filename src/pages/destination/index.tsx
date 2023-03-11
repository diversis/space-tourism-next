import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Explore from "@/lib/buttons/explore";
import { InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import GlowWrap from "@/components/shared/glowwrap";

export async function getStaticProps() {
    const data = require("@/lib/data.json");
    console.log(data);
    return {
        props: { data: [...data.destinations] }, // will be passed to the page component as props
    };
}

export default function Destination(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    console.log(props);
    const [render, setRender] = useState(true);
    const data = props.data;
    const [tab, setTab] = useState(0);
    const h5Text = "So, you want to travel to";
    const h1Text = "Space";
    const longText =
        "Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!";

    const sentence: Variants = {
        hidden: {
            opacity: 0,
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
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delay: data[tab].name.length - 1,
                when: "beforeChildren",
            },
        },
    };
    const tabName: Variants = {
        hidden: {
            mask: "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
            maskPosition: "70% 0%",
            maskSize: "800%",
            WebkitMask:
                "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
            WebkitMaskPosition: "70% 0%",
            WebkitMaskSize: "800%",
            opacity: 1,
        },
        visible: {
            opacity: 1,

            maskPosition: "45% 0%",

            WebkitMaskPosition: "45% 0%",

            transition: {
                duration: 6,
                type: "tween",
                ease: "easeOut",
                delay: 0.5,
            },
        },
    };
    useEffect(() => {
        setRender(false);
        if (data[tab]?.name) setRender(true);
    }, [tab, data]);
    return (
        <>
            <div className="flex h-full w-full flex-row">
                <div className="flex-1 xl:basis-[10.375rem]"></div>

                <div className="container flex h-full flex-col items-center justify-between gap-y-4 overflow-y-clip py-12 px-6  xl:grid xl:grid-cols-2 xl:grid-rows-[min-content_1fr_8rem] xl:place-items-end xl:justify-items-start xl:py-0 ">
                    <div className="col-span-2 w-full text-6xl text-white ">
                        Title
                    </div>
                    <div className=" flex h-full w-full items-end  justify-self-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex  w-full justify-center overflow-hidden"
                        >
                            <AnimatePresence>
                                <Image
                                    width={445}
                                    height={445}
                                    alt={`${"f"}`}
                                    src={`${data[tab]?.images?.webp}`}
                                    className="aspect-square"
                                ></Image>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.article
                            className="flex flex-col gap-y-4 text-center xl:text-left"
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.nav
                                className="w-full tracking-widest text-accent"
                                variants={sentence}
                            >
                                <ul className="mx-auto flex flex-row justify-center gap-x-[2em] xl:justify-start">
                                    {Array.isArray(data) &&
                                        data.map((item, key) => {
                                            return (
                                                <li key={`${item.name}-${key}`}>
                                                    <GlowWrap
                                                        rx="8px"
                                                        offset="8px"
                                                        length="12px"
                                                        travel="-10"
                                                    >
                                                        <button
                                                            className={`${
                                                                item.name ===
                                                                data[tab].name
                                                                    ? "border-secondary"
                                                                    : "border-transparent"
                                                            } flex items-center border-b-[3px] py-2 tracking-wider [&:is(:hover,:focus)]:border-secondary/50`}
                                                            onClick={() => {
                                                                setTab(key);
                                                            }}
                                                        >
                                                            <span>
                                                                {item.name.toUpperCase()}
                                                            </span>
                                                        </button>
                                                    </GlowWrap>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </motion.nav>
                            <motion.h2
                                variants={tabName}
                                className="spicy linear-mask relative mb-[0.15em] w-full bg-conic bg-[size:800%+800%] bg-no-repeat"
                            >
                                {data[tab].name.toUpperCase()}
                            </motion.h2>
                            {render && data[tab].description && (
                                <motion.p
                                    className="text-shadow h-[6em] max-w-[46ch] text-accent"
                                    variants={article}
                                >
                                    <Balancer ratio={0.5}>
                                        {data[tab].description
                                            .split("")
                                            .map(
                                                (
                                                    char: string,
                                                    index: number,
                                                ) => {
                                                    return (
                                                        <motion.span
                                                            key={
                                                                data[tab].name +
                                                                "-" +
                                                                char +
                                                                "-" +
                                                                index
                                                            }
                                                            variants={letter}
                                                        >
                                                            {char}
                                                        </motion.span>
                                                    );
                                                },
                                            )}
                                    </Balancer>
                                </motion.p>
                            )}
                        </motion.article>
                    </AnimatePresence>
                </div>
                <div className="flex-1 xl:basis-[10.375rem]"></div>
            </div>
        </>
    );
}
