import useWindowSize from "@/lib/hooks/use-window-size";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useResizeDetector } from "react-resize-detector";

// sky from https://codepen.io/sharnajh/pen/WNvppRy

export default function Stars() {
    const [render, setRender] = useState(false);
    const router = useRouter();

    // const skyDiv = useRef(null);

    const [layout, setLayout] = useState("w-full h-2/3 xl:w-2/3 h-full");

    const onResize = useCallback(() => {
        setRender(false);
        setTimeout(() => setRender(true));
    }, []);

    const { width, height, ref } = useResizeDetector({
        refreshMode: "debounce",
        refreshRate: 1000,
        onResize,
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
        return Math.floor(
            Math.random() * Math.floor(width ? width : 0),
        ).toString();
    };
    const getRandomY = () => {
        return Math.floor(
            Math.random() * Math.floor(height ? height : 0),
        ).toString();
    };
    useEffect(() => {
        setRender(true);
    }, []);

    useEffect(() => {
        switch (router.pathname) {
            case "/":
                setLayout("w-full h-2/3 xl:w-2/3 xl:h-full");
                setNum(35);
                break;
            case "/destination":
                setLayout("h-full w-full");
                setNum(60);
                break;
            case "/crew":
                setLayout("h-1/4 w-full mb-0 mt-auto");
                setNum(25);
                break;
            case "/technology":
                setLayout("h-full w-full");
                setNum(60);
                break;
        }
    }, [router.pathname]);

    return (
        <>
            <motion.div
                id="skyWrap"
                initial="hidden"
                animate="visible"
                variants={skyWrapVariants}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-0"
            >
                <div className="relative inset-0 flex h-full w-full ">
                    <div ref={ref} className={`${layout}   `}>
                        {render && (
                            <motion.svg
                                id="sky"
                                variants={skyVariants}
                                exit={{ opacity: 0 }}
                                className={` pointer-events-none relative  h-full w-full overflow-hidden `}
                            >
                                {[...Array(num)].map((x, y) => (
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
                                        key={`star-${y}`}
                                        className="pointer-events-none"
                                        variants={stars}
                                    />
                                ))}
                            </motion.svg>
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
}
