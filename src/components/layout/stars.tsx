import useWindowSize from "@/lib/hooks/use-window-size";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useResizeDetector } from "react-resize-detector";

// sky adapted from https://codepen.io/sharnajh/pen/WNvppRy

export default function Stars() {
    const [render, setRender] = useState(false);
    const [vw, setVw] = useState(0);
    const [vh, setVh] = useState(0);
    const router = useRouter();
    const skyRef = useRef<HTMLDivElement>(null);

    const { isDesktop, isTablet } = useWindowSize();

    const [layout, setLayout] = useState("w-full h-2/3 xl:w-2/3 h-full");

    const onResize = useCallback(() => {
        setRender(false);
        setVw(skyRef.current?.clientWidth ? +skyRef.current?.clientWidth : 0);
        setVh(skyRef.current?.clientHeight ? +skyRef.current?.clientHeight : 0);
        setTimeout(() => setRender(true));
    }, []);

    const resized = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 1000,
        onResize,
        targetRef: skyRef,
    });

    const [num, setNum] = useState(25);

    const skyVariants: Variants = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 1,
                type: "tween",
                ease: "backIn",
            },
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };
    const skyWrapVariants: Variants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
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
        return Math.floor(Math.random() * Math.floor(vw ? vw : 0)).toString();
    };
    const getRandomY = () => {
        return Math.floor(Math.random() * Math.floor(vh ? vh : 0)).toString();
    };
    useEffect(() => {
        setRender(true);
    }, []);

    useEffect(() => {
        switch (router.pathname) {
            case "/":
                setLayout("w-full h-2/3 md:h-1/2 xl:w-2/3 xl:h-full");
                setNum(7);
                break;
            case "/destination":
                setLayout("h-full w-full");
                setNum(12);
                break;
            case "/crew":
                setLayout("h-1/4 w-full mb-0 mt-auto");
                setNum(5);
                break;
            case "/technology":
                setLayout("h-full w-full");
                setNum(12);
                break;
        }
    }, [router.pathname]);

    return (
        <motion.div
            key="skyWrap"
            id="skyWrap"
            initial="hidden"
            animate="visible"
            variants={skyWrapVariants}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
        >
            <div className="relative inset-0 flex h-full w-full ">
                <div ref={skyRef} className={`${layout}   `}>
                    {render && (
                        <motion.svg
                            key="sky"
                            id="sky"
                            variants={skyVariants}
                            className={` pointer-events-none relative  h-full w-full overflow-hidden `}
                        >
                            {[
                                ...Array(
                                    isDesktop
                                        ? 5 * num
                                        : isTablet
                                        ? 3 * num
                                        : num,
                                ),
                            ].map((any, i) => {
                                return (
                                    <motion.circle
                                        cx={getRandomX()}
                                        cy={getRandomY()}
                                        r={randomRadius()}
                                        stroke="none"
                                        strokeWidth="0"
                                        fill={`hsl(${Math.floor(
                                            Math.random() * 250,
                                        )},${
                                            20 + Math.floor(Math.random() * 80)
                                        }%,${
                                            80 + Math.floor(Math.random() * 20)
                                        }%)`}
                                        key={`star-${i}`}
                                        className="pointer-events-none"
                                        variants={stars}
                                    />
                                );
                            })}
                        </motion.svg>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
