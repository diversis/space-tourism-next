import Image from "next/image";

import Balancer from "react-wrap-balancer";
import { AnimatePresence, motion } from "framer-motion";

import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import GlowWrap from "@/components/shared/glowwrap";
import {
    ARTICLE_VARIANTS,
    HR_VARIANTS,
    IMAGE_VARIANTS,
    SECTION_VARIANTS,
    TABS_VARIANTS,
    TAB_TITLE_VARIANTS,
} from "@/lib/constants";

export async function getStaticProps() {
    const data = require("@/lib/data.json");

    return {
        props: { data: [...data.destinations] }, // will be passed to the page component as props
    };
}

export default function Destination(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const data = props.data;
    const [tab, setTab] = useState(0);

    return (
        <>
            <div
                className="grid w-full grid-cols-[minmax(1rem,auto)_1fr_minmax(1rem,auto)]  
                 gap-y-8
                overflow-hidden [grid-template-areas:'._title_.''._image_.''._tabs_.''._description_.''._._.']
                md:grid-cols-[2.4375rem_1fr_2.4375rem] 
                xl:grid-cols-[minmax(10.4375rem,auto)_minmax(0,44rem)_minmax(0,8rem)_minmax(0,44rem)_minmax(10.4375rem,auto)] 
                xl:grid-rows-[min-content_1fr_min-content_8rem] xl:items-start
                xl:[grid-template-areas:'._title_title_title_.''._image_._tabs_.''._image_._description_.''._._._._.'] 
                
                "
            >
                <h5 className="   place-self-start text-white [grid-area:title]">
                    <span aria-hidden className="mr-4 font-bold text-white/25">
                        01
                    </span>
                    Pick your destination
                </h5>
                {/* Column 1 */}
                <div className="grid place-items-center justify-center place-self-end  justify-self-center [grid-area:image] xl:place-items-end   xl:items-end">
                    {/* Image */}
                    <AnimatePresence>
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
                                        className="flex h-full w-full justify-center  [grid-area:1/1]"
                                    >
                                        <motion.div
                                            variants={IMAGE_VARIANTS}
                                            className="relative flex h-full w-2/3 items-end  justify-center overflow-hidden xl:w-full xl:place-items-end"
                                        >
                                            <Image
                                                width={445}
                                                height={445}
                                                alt={`${"f"}`}
                                                src={`${item.images?.webp}`}
                                                className=" "
                                                priority
                                            ></Image>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                    </AnimatePresence>
                </div>

                {/* Column 2 */}
                {/* Tabs */}
                <motion.nav
                    className="w-full place-self-end tracking-widest text-accent [grid-area:tabs]"
                    initial="hidden"
                    animate="visible"
                    variants={TABS_VARIANTS}
                >
                    <ul className="mx-auto flex flex-row justify-center gap-x-[1em] xl:justify-start xs:gap-x-[2em]">
                        {Array.isArray(data) &&
                            data.map((item, key) => {
                                return (
                                    <li key={`${item.name}-${key}-li`}>
                                        <GlowWrap
                                            rx="8px"
                                            offset="8px"
                                            length="18px"
                                            travel="-6"
                                            speed="1600"
                                        >
                                            <a
                                                href={`#${item.name}`}
                                                className={`${
                                                    item.name === data[tab].name
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
                {/* Description */}
                <article className="grid w-full place-self-end text-center [grid-area:description] xl:text-left">
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
                                        className="flex w-full flex-col justify-between gap-y-8 [grid-area:1/1]"
                                        variants={SECTION_VARIANTS}
                                    >
                                        <motion.h2
                                            variants={TAB_TITLE_VARIANTS}
                                            className="spicy relative mb-[0.15em] w-full bg-conic bg-[size:800%+800%] bg-no-repeat"
                                        >
                                            {item.name.toUpperCase()}
                                        </motion.h2>
                                        <motion.p
                                            className="text-shadow w-full pb-[1.75em] text-accent"
                                            variants={ARTICLE_VARIANTS}
                                        >
                                            <Balancer ratio={0.5}>
                                                {item.description}
                                            </Balancer>
                                        </motion.p>
                                        <motion.hr
                                            variants={HR_VARIANTS}
                                            className="h-0 border-solid border-accent/25"
                                        />
                                        <motion.div
                                            variants={ARTICLE_VARIANTS}
                                            className="flex w-full flex-col gap-y-4 text-secondary md:flex-row"
                                        >
                                            <h6 className=" flex w-full  flex-col gap-y-2 xl:items-start xl:justify-end ">
                                                <span className="h7 uppercase">
                                                    Avg. distance
                                                </span>
                                                <span className="align-bottom uppercase">
                                                    {item.distance}
                                                </span>
                                            </h6>
                                            <h6 className="flex w-full flex-col gap-y-2 xl:items-start xl:justify-end">
                                                <span className="h7 uppercase ">
                                                    Est. travel time
                                                </span>
                                                <span className="align-bottom uppercase">
                                                    {item.travel}
                                                </span>
                                            </h6>
                                        </motion.div>
                                    </motion.section>
                                );
                            })}
                    </AnimatePresence>
                </article>
            </div>
        </>
    );
}
