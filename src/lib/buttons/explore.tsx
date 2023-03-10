import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

// sky from https://codepen.io/sharnajh/pen/WNvppRy

export default function Explore() {
    const exploreMotionBorder = {
        rest: {
            backgroundImage:
                "repeating-conic-gradient(from 0turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
            backgroundSize: "cover",
            scale: 1,
            opacity: 0,
            transition: {
                duration: 4,
                type: "spring",
                ease: "easeIn",
                bounce: 0.5,
                stiffness: 10,
            },
        },
        hover: {
            backgroundImage: [
                "repeating-conic-gradient(from 0.1turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
                "repeating-conic-gradient(from 0.5turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
                "repeating-conic-gradient(from 0.65turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
                "repeating-conic-gradient(from 0.8turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
                "repeating-conic-gradient(from 1turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
            ],
            scale: [1, 1.2, 1.4, 1.5],
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeOut",
            },
        },
        tap: {
            backgroundImage:
                "repeating-conic-gradient(from 1turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
            scale: [1.5, 1.25, 1.2],

            transition: {
                duration: 0.4,
                type: "spring",
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
            borderColor: "hsla(0,0%,100%,0.05)",
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            opacity: 0,
            scale: [1, 5, 5, 1],
            transition: {
                duration: 2,
                type: "spring",
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 1,
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
                <MotionConfig reducedMotion="user">
                    <motion.a
                        initial="rest"
                        whileHover="hover"
                        whileFocus="hover"
                        animate="rest"
                        whileTap="tap"
                        href="/"
                        className="explore relative z-30 inline-grid aspect-square place-items-center rounded-[50%] border-[5px] border-solid border-transparent px-[1.7865em] uppercase tracking-exp text-primary outline-none transition-all focus:border-primary [&:is(:hover,:focus)]:shadow-exp"
                    >
                        <motion.span
                            variants={exploreMotionBorder}
                            className="round-mask explore-border  pointer-events-none absolute inset-0 -z-20 rounded-full "
                        ></motion.span>
                        <motion.span
                            variants={exploreMotionBg}
                            className="pointer-events-none absolute inset-0 -z-10 rounded-full"
                        ></motion.span>
                        <motion.span
                            variants={exploreMotionShadow}
                            className="pointer-events-none absolute inset-0 -z-20 rounded-full border-4"
                        ></motion.span>
                        Explore
                    </motion.a>
                </MotionConfig>
            </AnimatePresence>
        </h4>
    );
}
