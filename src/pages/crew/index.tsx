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
            <div
                className="grid h-full w-full grid-cols-[minmax(1.5rem,auto)_1fr_minmax(1.5rem,auto)]  grid-rows-[min-content_1fr_min-content_auto_1.6875rem] 
               gap-y-8 overflow-hidden [grid-template-areas:'._title_.''._image_.''._tabs_.''._description_.''._._.']
               md:grid-cols-[2.4375rem_1fr_2.4375rem] md:grid-rows-[min-content_auto_min-content_1fr] md:gap-y-[3.625rem]
               md:[grid-template-areas:'._title_.''._description_.''._tabs_.''._image_.'] xl:w-fit
               xl:grid-cols-[10.4375rem_minmax(29.5625rem,48rem)_minmax(29.5625rem,48rem)_10.4375rem] 
               xl:grid-rows-[min-content_1fr_min-content_2.375rem] xl:items-start
               xl:[grid-template-areas:'._title_image_.''._description_image_.''._tabs_image_.''._._image_.']"
            >
                <div className="flex w-full flex-1 [grid-area:.]"></div>
                {/* Page Title */}
                <h5
                    tabIndex={0}
                    className="col-span-2 w-full text-center text-white  [grid-area:title] md:text-left"
                >
                    <span aria-hidden className="mr-4 font-bold text-white/25">
                        02
                    </span>
                    Meet your crew
                </h5>
                {/* Column 1 */}
                <div className="relative grid h-full  w-full items-end justify-self-center [grid-area:image] ">
                    {/* Image */}
                    <AnimatePresence>
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
                                            className="relative flex h-full w-2/3 items-end  justify-center overflow-hidden border-b  border-secondary/25 xl:w-full xl:place-items-end xl:border-transparent"
                                        >
                                            <Image
                                                alt={`${item.name}`}
                                                src={src}
                                                className=" bottom-0 "
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
                    <ul className="mx-auto flex flex-row justify-center gap-x-[1em] xl:justify-start">
                        {Array.isArray(data) &&
                            data.map((item, key) => {
                                return (
                                    <li key={`${item.name}-${key}-li`}>
                                        <GlowWrap
                                            rx="999px"
                                            length="12px"
                                            travel="-10"
                                            data-glow-animation="grow"
                                        >
                                            <span className="sr-only">
                                                {item.name}
                                            </span>
                                            <motion.a
                                                title={item.name}
                                                href={`#${item.name}`}
                                                className={`group/tab grid h-7 w-7 place-items-center rounded-full  `}
                                                initial={{ scale: 1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    setTab(key);
                                                }}
                                            >
                                                <span
                                                    className={`${
                                                        item.name ===
                                                        data[tab].name
                                                            ? "bg-secondary"
                                                            : "bg-secondary/25"
                                                    } block h-4 w-4 rounded-full   transition-colors group-hover/tab:bg-secondary/50 group-focus/tab:bg-secondary/50`}
                                                ></span>
                                            </motion.a>
                                        </GlowWrap>
                                    </li>
                                );
                            })}
                    </ul>
                </motion.nav>
                {/* column 2 */}
                <div className="flex w-full flex-col text-center [grid-area:description] xl:h-full xl:items-end xl:justify-center xl:text-left">
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
                                            className="flex flex-col items-center gap-y-4 [grid-area:1/1] xl:items-start xl:justify-start "
                                            variants={SECTION_LEFT_VARIANTS}
                                        >
                                            <motion.h4
                                                tabIndex={0}
                                                variants={ARTICLE_FALL_VARIANTS}
                                                className="flex w-full flex-col text-secondary/50 md:flex-row"
                                            >
                                                <span className="flex w-full items-center justify-center  uppercase xl:items-start xl:justify-start">
                                                    {item.role}
                                                </span>
                                            </motion.h4>
                                            <motion.h3
                                                tabIndex={0}
                                                variants={
                                                    TAB_TITLE_LEFT_VARIANTS
                                                }
                                                className="spicy relative mb-[0.15em] w-max overflow-x-visible bg-conic bg-[size:800%+800%] bg-no-repeat leading-tight"
                                            >
                                                {item.name.toUpperCase()}
                                            </motion.h3>
                                            <motion.p
                                                tabIndex={0}
                                                className="text-shadow mt-4 w-full max-w-[56ch] text-accent xl:max-w-[46ch] "
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
        </>
    );
}
