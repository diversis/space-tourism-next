import Image from "next/image";

import Balancer from "react-wrap-balancer";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import GlowWrap from "@/components/shared/glowwrap";
import {
    ARTICLE_VARIANTS,
    HR_VARIANTS,
    IMAGE_VARIANTS,
    SECTION_LEFT_VARIANTS,
    TABS_VARIANTS,
    TAB_TITLE_VARIANTS,
} from "@/lib/constants";

export async function getStaticProps() {
    const data = require("@/lib/data.json");
    console.log(data);
    return {
        props: { data: [...data.crew] }, // will be passed to the page component as props
    };
}

export default function Crew(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const data = props.data;
    const [tab, setTab] = useState(0);

    return (
        <>
            <div className="flex h-full w-full flex-row">
                <div className="flex-1 xl:basis-[10.375rem]"></div>

                <div className="container grid  h-full grid-cols-1 items-center justify-between gap-y-4 overflow-y-clip py-12 px-6 [grid-template-areas:'title''image''tabs''description'] xl:grid xl:grid-cols-2 xl:grid-rows-[min-content_1fr_min-content_8rem] xl:place-items-end xl:justify-items-start xl:gap-x-12 xl:py-0 xl:[grid-template-areas:'title_title''description_image''tabs_image''._image'] ">
                    {/* Page Title */}
                    <h5 className="col-span-2 w-full  text-white [grid-area:title]">
                        <span
                            aria-hidden
                            className="mr-4 font-bold text-white/25"
                        >
                            02
                        </span>
                        Meet your crew
                    </h5>
                    {/* Column 1 */}
                    <div className="relative flex h-[50vmin] w-full items-end justify-self-center [grid-area:image]  xl:h-full">
                        {/* Image */}
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
                                            className="absolute inset-0 flex items-end justify-center"
                                        >
                                            <motion.div
                                                variants={IMAGE_VARIANTS}
                                                className="absolute inset-0  grid aspect-auto w-full  place-items-center justify-center overflow-hidden xl:place-items-end"
                                            >
                                                <Image
                                                    width={445}
                                                    height={445}
                                                    alt={`${"f"}`}
                                                    src={`${item.images?.webp}`}
                                                    className="w-full"
                                                    priority
                                                ></Image>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                        </AnimatePresence>
                    </div>
                    {/* Tabs */}
                    <motion.nav
                        className="w-full tracking-widest text-accent [grid-area:tabs]"
                        initial="hidden"
                        animate="visible"
                        variants={TABS_VARIANTS}
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
                                                <span className="sr-only">
                                                    {item.name}
                                                </span>
                                                <a
                                                    title={item.name}
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
                                                ></a>
                                            </GlowWrap>
                                        </li>
                                    );
                                })}
                        </ul>
                    </motion.nav>
                    {/* column 2 */}
                    <div className="flex w-full flex-col gap-y-4 text-center [grid-area:description] xl:h-full xl:items-end xl:justify-end xl:gap-y-8 xl:text-left">
                        {/* Description */}
                        <article className="relative h-full min-h-[25rem] w-full outline outline-green-500 md:min-h-[17rem] xl:max-h-[20.25rem] ">
                            <AnimatePresence>
                                {Array.isArray(data) &&
                                    data.map((item, key) => {
                                        return (
                                            <motion.section
                                                initial="hidden"
                                                animate={
                                                    item.name === data[tab].name
                                                        ? "visible"
                                                        : "hidden"
                                                }
                                                exit="hidden"
                                                key={`${item.name}-${key}-li`}
                                                className="absolute inset-0 flex flex-col items-center justify-center gap-y-4 xl:items-start "
                                                variants={SECTION_LEFT_VARIANTS}
                                            >
                                                <motion.h4
                                                    variants={ARTICLE_VARIANTS}
                                                    className="flex w-full flex-col text-secondary/50 md:flex-row"
                                                >
                                                    <span className="flex w-full items-center justify-center  uppercase xl:items-start xl:justify-start">
                                                        {item.role}
                                                    </span>
                                                </motion.h4>
                                                <motion.h3
                                                    variants={
                                                        TAB_TITLE_VARIANTS
                                                    }
                                                    className="spicy relative mb-[0.15em] w-max overflow-x-visible bg-conic bg-[size:800%+800%] bg-no-repeat leading-tight"
                                                >
                                                    {item.name.toUpperCase()}
                                                </motion.h3>
                                                <motion.p
                                                    className="text-shadow mt-4 h-min w-full max-w-[46ch] text-accent outline outline-cyan-500 xl:max-h-[10em]"
                                                    variants={ARTICLE_VARIANTS}
                                                >
                                                    <Balancer ratio={0.5}>
                                                        {item.bio}
                                                    </Balancer>
                                                </motion.p>
                                            </motion.section>
                                        );
                                    })}
                            </AnimatePresence>
                        </article>
                    </div>
                </div>
                <div className="flex-1 xl:basis-[10.375rem]"></div>
            </div>
        </>
    );
}
