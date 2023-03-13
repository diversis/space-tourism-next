import Image, { StaticImageData } from "next/image";

import Balancer from "react-wrap-balancer";
import { AnimatePresence, motion } from "framer-motion";

import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import GlowWrap from "@/components/shared/glowwrap";
import {
    ARTICLE_VARIANTS,
    IMAGE_VARIANTS,
    SECTION_LEFT_VARIANTS,
    TABS_VARIANTS,
    ARTICLE_FALL_VARIANTS,
    TAB_TITLE_LEFT_VARIANTS,
} from "@/lib/constants";
import { CrewMember } from "@/lib/types";

import commanderImage from "@public/image/crew/image-douglas-hurley.png";
import missionSpecialistImage from "@public/image/crew/image-mark-shuttleworth.png";
import pilotImage from "@public/image/crew/image-victor-glover.png";
import flightEngineerImage from "@public/image/crew/image-anousheh-ansari.png";

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
    const data: CrewMember[] = props.data;
    const [tab, setTab] = useState(0);

    return (
        <>
            <div className="flex h-full w-full flex-row">
                <div className="flex-1 xl:basis-[10.375rem]"></div>

                <div
                    className="container grid  h-full grid-cols-1 items-center justify-between gap-y-4 
                overflow-y-clip py-12 px-6 [grid-template-areas:'title''image''tabs''description'] 
                md:pb-0 md:[grid-template-areas:'title''description''tabs''image'] 
                xl:grid xl:grid-cols-2 xl:grid-rows-[min-content_1fr_min-content_8rem] 
                xl:place-items-end xl:justify-items-start xl:gap-x-12 xl:py-0 
                xl:[grid-template-areas:'title_title''description_image''tabs_image''._image'] "
                >
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
                    <div className="relative grid h-full  w-full items-end justify-self-center [grid-area:image] ">
                        {/* Image */}
                        <AnimatePresence mode="sync">
                            {Array.isArray(data) &&
                                data.map((item: CrewMember, key) => {
                                    const role = item.role.toLowerCase();

                                    let src: StaticImageData = commanderImage;
                                    switch (role) {
                                        case "commander":
                                            src = commanderImage;
                                            break;
                                        case "mission specialist":
                                            src = missionSpecialistImage;
                                            break;
                                        case "pilot":
                                            src = pilotImage;
                                            break;
                                        case "flight engineer":
                                            src = flightEngineerImage;
                                            break;
                                    }
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
                                                className="relative grid  h-full w-2/3 place-items-center  justify-center overflow-hidden xl:w-full xl:place-items-end"
                                            >
                                                <Image
                                                    alt={`${"f"}`}
                                                    src={src}
                                                    className=" bottom-0  h-full xl:w-full"
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
                                                rx="999px"
                                                offset="8px"
                                                length="12px"
                                                travel="-10"
                                                data-glow-animation="grow"
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
                                                            ? "bg-secondary"
                                                            : "bg-secondary/25"
                                                    } block h-4  w-4 rounded-full   transition-colors [&:is(:hover,:focus)]:bg-accent/50`}
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
                    <div className="flex w-full flex-col gap-y-4 text-center [grid-area:description] xl:h-full xl:items-end xl:justify-center xl:gap-y-8 xl:text-left">
                        {/* Description */}
                        <article className="relative grid w-full ">
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
                                                className="flex flex-col items-center justify-center gap-y-4 [grid-area:1/1] xl:items-start "
                                                variants={SECTION_LEFT_VARIANTS}
                                            >
                                                <motion.h4
                                                    variants={
                                                        ARTICLE_FALL_VARIANTS
                                                    }
                                                    className="flex w-full flex-col text-secondary/50 md:flex-row"
                                                >
                                                    <span className="flex w-full items-center justify-center  uppercase xl:items-start xl:justify-start">
                                                        {item.role}
                                                    </span>
                                                </motion.h4>
                                                <motion.h3
                                                    variants={
                                                        TAB_TITLE_LEFT_VARIANTS
                                                    }
                                                    className="spicy relative mb-[0.15em] w-max overflow-x-visible bg-conic bg-[size:800%+800%] bg-no-repeat leading-tight"
                                                >
                                                    {item.name.toUpperCase()}
                                                </motion.h3>
                                                <motion.p
                                                    className="text-shadow mt-4 w-full max-w-[46ch] text-accent "
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
