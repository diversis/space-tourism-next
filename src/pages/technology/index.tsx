import Image, { StaticImageData } from "next/image";

import Balancer from "react-wrap-balancer";
import { AnimatePresence, motion } from "framer-motion";

import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import GlowWrap from "@/components/shared/glowwrap";
import {
    ARTICLE_VARIANTS,
    IMAGE_VARIANTS,
    SECTION_VARIANTS,
    TABS_VARIANTS,
    ARTICLE_FALL_VARIANTS,
    TAB_TITLE_VARIANTS,
} from "@/lib/constants";
import { CrewMember } from "@/lib/types";

import launchVehicleH from "@public/image/technology/image-launch-vehicle-landscape.jpg";
import launchVehicleV from "@public/image/technology/image-launch-vehicle-portrait.jpg";
import spaceportH from "@public/image/technology/image-spaceport-landscape.jpg";
import spaceportV from "@public/image/technology/image-spaceport-portrait.jpg";
import spaceCapsuleH from "@public/image/technology/image-space-capsule-landscape.jpg";
import spaceCapsuleV from "@public/image/technology/image-space-capsule-portrait.jpg";

export async function getStaticProps() {
    const data = require("@/lib/data.json");
    console.log(data);
    return {
        props: { data: [...data.crew] }, // will be passed to the page component as props
    };
}

export default function Technology(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const data: CrewMember[] = props.data;
    const [tab, setTab] = useState(0);

    return (
        <>
            <div className="flex h-full w-full flex-row items-start">
                <div className="2xl:grow-1 shrink-0 xl:basis-[10.375rem]"></div>

                <div
                    className=" container grid h-full grid-cols-1 items-center justify-between gap-y-4 
                overflow-y-clip px-6 pb-12 [grid-template-areas:'title''image''tabs''description'] 
                md:pb-0 md:[grid-template-areas:'title''description''tabs''image'] 
                xl:grid xl:grid-cols-2 xl:grid-rows-[min-content_1fr_min-content_8rem] 
                xl:place-items-end xl:justify-items-start xl:gap-x-12 xl:p-0 
                xl:[grid-template-areas:'title_title''description_image''tabs_image''._image'] "
                >
                    {/* Page Title */}
                    <h5 className="col-span-2 w-full  text-white [grid-area:title]">
                        <span
                            aria-hidden
                            className="mr-4 font-bold text-white/25"
                        >
                            03
                        </span>
                        Space launch 101
                    </h5>
                    {/* Column 1 */}
                    <div className="relative grid h-full  w-full items-center justify-self-end [grid-area:image] ">
                        {/* Image */}
                        <AnimatePresence>
                            {Array.isArray(data) &&
                                data.map((item: CrewMember, key) => {
                                    const role = item.role.toLowerCase();

                                    let src: {
                                        v: StaticImageData;
                                        h: StaticImageData;
                                    } = {
                                        h: launchVehicleH,
                                        v: launchVehicleV,
                                    };
                                    switch (role) {
                                        case "Launch vehicle":
                                            src = {
                                                h: launchVehicleH,
                                                v: launchVehicleV,
                                            };
                                            break;
                                        case "spaceport":
                                            src = {
                                                h: spaceportH,
                                                v: spaceportV,
                                            };
                                            break;
                                        case "space capsule":
                                            src = {
                                                h: spaceCapsuleH,
                                                v: spaceCapsuleV,
                                            };
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
                                                className="relative flex h-full w-2/3 items-end justify-center overflow-hidden border-b border-secondary/25 xl:w-full  xl:place-items-end xl:items-center xl:justify-end xl:border-transparent"
                                            >
                                                <Image
                                                    alt={`${"f"}`}
                                                    src={src.h}
                                                    className=" bottom-0 xl:hidden"
                                                    priority
                                                ></Image>
                                                <Image
                                                    alt={`${"f"}`}
                                                    src={src.v}
                                                    className=" bottom-0 hidden xl:block"
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
                                                <a
                                                    title={item.name}
                                                    href={`#${item.name}`}
                                                    className={`group/tab grid h-7 w-7 place-items-center rounded-full`}
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
                                                        } block h-4 w-4 rounded-full transition-colors group-hover/tab:bg-accent/50 group-focus/tab:bg-accent/50`}
                                                    ></span>
                                                </a>
                                            </GlowWrap>
                                        </li>
                                    );
                                })}
                        </ul>
                    </motion.nav>
                    {/* column 2 */}
                    <div className="flex w-full flex-col gap-y-4 text-center [grid-area:description] xl:h-full xl:items-end xl:justify-center xl:gap-y-8 xl:text-left">
                        {/* Description */}
                        <p className="flex w-full flex-col text-secondary md:flex-row">
                            <span className="flex w-full items-center justify-center  font-condensed text-base uppercase tracking-wider xl:items-start xl:justify-start">
                                The terminology...
                            </span>
                        </p>
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
                                                variants={SECTION_VARIANTS}
                                            >
                                                <motion.h3
                                                    variants={
                                                        TAB_TITLE_VARIANTS
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

                <div className="flex-1 basis-0"></div>
            </div>
        </>
    );
}
