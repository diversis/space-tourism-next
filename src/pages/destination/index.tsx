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

    const imageVariants: Variants = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.7,
                type: "tween",
                ease: "backIn",
            },
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.7,
                type: "tween",
                ease: "backOut",
            },
        },
    };

    const sentence: Variants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
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
            },
        },
    };
    const articleBlock: Variants = {
        hidden: {
            opacity: 0,
            x: "100%",
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                mass: 0.3,
                staggerChildren: 0.5,
            },
        },
    };
    const tabName: Variants = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.3,
                type: "tween",
                ease: "easeOut",
            },
        },
        visible: {
            opacity: 1,

            transition: {
                duration: 0.7,
                type: "tween",
                ease: "backOut",
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
                    <div className="relative flex h-full w-full items-end  justify-self-center">
                        <AnimatePresence mode="sync">
                            {Array.isArray(data) &&
                                data.map((item, key) => {
                                    return (
                                        <motion.div
                                            initial="hidden"
                                            animate={
                                                item.name === data[tab].name
                                                    ? "visible"
                                                    : "hidden"
                                            }
                                            exit="hidden"
                                            key={`${item.name}-${key}-image`}
                                            className="absolute inset-0 flex items-end"
                                        >
                                            <motion.div
                                                variants={imageVariants}
                                                className=" flex  w-full justify-center overflow-hidden"
                                            >
                                                <Image
                                                    width={445}
                                                    height={445}
                                                    alt={`${"f"}`}
                                                    src={`${item.images?.webp}`}
                                                    className="aspect-square "
                                                    priority
                                                ></Image>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                        </AnimatePresence>
                    </div>

                    {/* className="grid h-full w-full grid-rows-[1fr_min-content_1fr] gap-y-4 text-center xl:text-left" */}
                    <div className=" flex h-full w-full flex-col items-end gap-y-4 text-center xl:text-left">
                        <motion.nav
                            className="w-full tracking-widest text-accent"
                            initial="hidden"
                            animate="visible"
                            variants={sentence}
                        >
                            <ul className="mx-auto flex flex-row justify-center gap-x-[2em] xl:justify-start">
                                {Array.isArray(data) &&
                                    data.map((item, key) => {
                                        return (
                                            <li key={`${item.name}-${key}-li`}>
                                                <GlowWrap
                                                    rx="8px"
                                                    offset="8px"
                                                    length="12px"
                                                    travel="-10"
                                                >
                                                    <a
                                                        href={`#${item.name}`}
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
                                                    </a>
                                                </GlowWrap>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </motion.nav>
                        <div className="relative h-full w-full">
                            <AnimatePresence>
                                {Array.isArray(data) &&
                                    data.map((item, key) => {
                                        return (
                                            <motion.article
                                                initial="hidden"
                                                animate={
                                                    item.name === data[tab].name
                                                        ? "visible"
                                                        : "hidden"
                                                }
                                                exit="hidden"
                                                key={`${item.name}-${key}-li`}
                                                className="absolute inset-0"
                                                variants={articleBlock}
                                            >
                                                <motion.h2
                                                    variants={tabName}
                                                    className="spicy relative mb-[0.15em] w-full bg-conic bg-[size:800%+800%] bg-no-repeat"
                                                >
                                                    {item.name.toUpperCase()}
                                                </motion.h2>
                                                <motion.p
                                                    className="text-shadow h-[9em] max-w-[46ch] text-accent"
                                                    variants={article}
                                                >
                                                    <Balancer ratio={0.5}>
                                                        {item.description}
                                                    </Balancer>
                                                </motion.p>
                                            </motion.article>
                                        );
                                    })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="flex-1 xl:basis-[10.375rem]"></div>
            </div>
        </>
    );
}
