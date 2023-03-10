import useWindowSize from "@/lib/hooks/use-window-size";
import { useEffect, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

// sky from https://codepen.io/sharnajh/pen/WNvppRy

export default function Stars() {
    const { isMobile, isTablet, isDesktop } = useWindowSize();
    const [render, setRender] = useState(false);

    let num = 25;
    let [vw, setVw] = useState(0);
    let [vh, setVh] = useState(0);

    const sky: Variants = {
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const stars: Variants = {
        initial: {
            opacity: 0,

            transition: {
                duration: 0.7,
                type: "tween",
                ease: "easeIn",
            },
        },
        visible: {
            opacity: [0, 1, 1, 0],

            transition: {
                times: [0, 0.2, 0.8, 1],
                duration: 5,
                type: "tween",
                ease: "easeIn",
                repeat: Infinity,
                repeatDelay: 5,
            },
        },
    };

    const randomRadius = () => {
        return Math.random() * 2 + 0.6;
    };
    const getRandomX = () => {
        return Math.floor(
            Math.random() * Math.floor(isDesktop ? (vw * 5) / 8 : vw),
        ).toString();
    };
    const getRandomY = () => {
        return Math.floor(
            Math.random() * Math.floor(isDesktop ? vh : (vh * 2) / 3),
        ).toString();
    };
    useEffect(() => {
        setRender(true);
        // starryNight();

        setVw(
            Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0,
            ),
        );
        setVh(
            Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0,
            ),
        );
    }, [isDesktop]);

    return (
        <>
            <AnimatePresence>
                {render && (
                    <motion.svg
                        id="sky"
                        initial="hidden"
                        animate="visible"
                        variants={sky}
                    >
                        {[...Array(num)].map((x, y) => (
                            <motion.circle
                                cx={getRandomX()}
                                cy={getRandomY()}
                                r={randomRadius()}
                                stroke="none"
                                strokeWidth="0"
                                fill={`hsl(${Math.floor(Math.random() * 250)},${
                                    20 + Math.floor(Math.random() * 80)
                                }%,${80 + Math.floor(Math.random() * 20)}%)`}
                                key={`star-${y}`}
                                className="star"
                                variants={stars}
                            />
                        ))}
                    </motion.svg>
                )}
            </AnimatePresence>
        </>
    );
}
