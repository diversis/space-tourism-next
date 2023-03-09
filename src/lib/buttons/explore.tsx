import anime from "animejs";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

// sky from https://codepen.io/sharnajh/pen/WNvppRy

export default function Explore() {
    const exploreMotionBorder = {
        rest: {
            backgroundImage:
                "repeating-conic-gradient(from 0turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
            backgroundSize: "cover",
            scale: 1,
            transition: {
                duration: 2,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            backgroundImage:
                "repeating-conic-gradient(from 1turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
            scale: [1, 1.2, 1.4, 1.5],

            transition: {
                duration: 0.4,
                type: "tween",
                ease: "easeOut",
            },
        },
        tap: {
            backgroundImage:
                "repeating-conic-gradient(from 0.7turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
            scale: [1.5, 1.25, 1.2],

            transition: {
                duration: 0.4,
                type: "tween",
                ease: "easeOut",
            },
        },
    };
    const exploreMotionBg = {
        rest: {
            backgroundColor: "hsl(0,0%,100%)",
            transition: {
                duration: 2,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            scale: [1, 1.02, 1],
            transition: {
                duration: 0.4,
                type: "tween",
                ease: "easeOut",
            },
        },
        tap: {
            scale: [1, 0.9],

            transition: {
                duration: 0.4,
                type: "tween",
                ease: "easeOut",
            },
        },
    };
    const exploreMotionShadow = {
        rest: {
            backgroundColor: "hsla(0,0%,100%,0.05)",
            scale: 1,
            transition: {
                duration: 0,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            backgroundColor: "hsla(0,0%,100%,0)",
            scale: [1, 20, 20, 1],
            transition: {
                duration: 2,
                type: "tween",
                ease: "easeOut",
            },
        },
        tap: {
            scale: [1, 0.9],

            transition: {
                duration: 0.4,
                type: "tween",
                ease: "easeOut",
            },
        },
    };
    return (
        <h4 className=" h-min w-min">
            <AnimatePresence>
                <motion.a
                    initial="rest"
                    whileHover="hover"
                    whileFocus="hover"
                    animate="rest"
                    whileTap="tap"
                    href="/"
                    className="relative z-30 inline-grid aspect-square place-items-center rounded-[50%] px-[1.9425em] uppercase tracking-exp text-primary"
                >
                    <motion.span
                        variants={exploreMotionBorder}
                        className="pointer-events-none absolute inset-0 -z-20 rounded-full"
                    ></motion.span>
                    <motion.span
                        variants={exploreMotionBg}
                        className="pointer-events-none absolute inset-0 -z-10 rounded-full"
                    ></motion.span>
                    <motion.span
                        variants={exploreMotionShadow}
                        className="pointer-events-none absolute inset-0 -z-20 rounded-full"
                    ></motion.span>
                    Explore
                </motion.a>
            </AnimatePresence>
        </h4>
    );
}
