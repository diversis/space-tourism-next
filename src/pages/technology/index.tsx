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
    TAB_TITLE_VARIANTS,
} from "@/lib/constants";
import { TechnologyType } from "@/lib/types";

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
        props: { data: [...data.technology] }, // will be passed to the page component as props
    };
}

export default function Technology(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const data: TechnologyType[] = props.data;
    const [tab, setTab] = useState(0);

    return (
        <>
            <div
                id="content"
                className="grid w-full grid-cols-[minmax(1rem,auto)_1fr_minmax(1rem,auto)]  
                gap-y-8
               overflow-hidden [grid-template-areas:'._title_.''image_image_image''._tabs_.''._description_.''._._.']
               md:grid-cols-[2.4375rem_1fr_2.4375rem] 
               xl:grid-cols-[minmax(10.4375rem,auto)_minmax(0,10rem)_minmax(0,44rem)_minmax(0,44rem)_minmax(10.4375rem,auto)] 
               xl:grid-rows-[min-content_1fr_8rem] xl:items-start
               xl:[grid-template-areas:'._title_title_title_.''._tabs_description_image_image''._._._._.'] "
            >
                {/* Column 1 */}
                <div className="relative grid h-full  w-full items-center justify-self-end [grid-area:image] ">
                    {/* Image */}
                    <AnimatePresence>
                        {Array.isArray(data) &&
                            data.map((item: TechnologyType, key) => {
                                const name = item.name.toLowerCase();

                                let src: {
                                    v: StaticImageData;
                                    h: StaticImageData;
                                } = {
                                    h: launchVehicleH,
                                    v: launchVehicleV,
                                };
                                switch (name) {
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
                                            className="relative flex h-full w-full items-end justify-center overflow-hidden xl:w-full  xl:place-items-end xl:items-center xl:justify-end"
                                        >
                                            <Image
                                                alt={`${"f"}`}
                                                src={src.h}
                                                className=" bottom-0 w-full xl:hidden"
                                                priority
                                            ></Image>
                                            <Image
                                                alt={`${"f"}`}
                                                src={src.v}
                                                className=" bottom-0 hidden xl:block "
                                                priority
                                            ></Image>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                    </AnimatePresence>
                </div>

                {/* Page Title */}
                <h5 className="col-span-2 w-full  text-white [grid-area:title]">
                    <span aria-hidden className="mr-4 font-bold text-white/25">
                        03
                    </span>
                    Space launch 101
                </h5>

                {/* Tabs */}
                <motion.nav
                    className="flex h-full w-full items-center justify-center tracking-widest text-accent [grid-area:tabs] xl:justify-start "
                    initial="hidden"
                    animate="visible"
                    variants={TABS_VARIANTS}
                >
                    <ul className="flex flex-row  gap-y-8 gap-x-[1rem]  xl:flex-col ">
                        {Array.isArray(data) &&
                            data.map((item, key) => {
                                return (
                                    <li key={`${item.name}-${key}-li`}>
                                        <span className="sr-only">
                                            {item.name}
                                        </span>
                                        <GlowWrap
                                            rx="999px"
                                            length="12px"
                                            travel="-10"
                                            data-glow-animation="grow"
                                            className="grid w-min place-items-center"
                                        >
                                            <h4>
                                                <motion.a
                                                    title={item.name}
                                                    initial={{ scale: 1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    href={`#${item.name}`}
                                                    className={`${
                                                        item.name ===
                                                        data[tab].name
                                                            ? "bg-secondary text-primary"
                                                            : "bg-transparent text-secondary"
                                                    }  inline-flex aspect-square w-[2.5em] items-center justify-center rounded-full  border-[3px] border-secondary/25  transition-colors  [&:is(:hover,:focus)]:border-secondary`}
                                                    onClick={() => {
                                                        setTab(key);
                                                    }}
                                                >
                                                    <span className="leading-none tracking-normal">
                                                        {1 + +key}
                                                    </span>
                                                </motion.a>
                                            </h4>
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
                                                variants={TAB_TITLE_VARIANTS}
                                                className="spicy relative mb-[0.15em] w-max overflow-x-visible bg-conic bg-[size:800%+800%] bg-no-repeat leading-tight"
                                            >
                                                {item.name.toUpperCase()}
                                            </motion.h3>
                                            <motion.p
                                                className="text-shadow mt-4 w-full max-w-[46ch] text-accent "
                                                variants={ARTICLE_VARIANTS}
                                            >
                                                <Balancer ratio={0.5}>
                                                    {item.description}
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
