import useWindowSize from "@/lib/hooks/use-window-size";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useResizeDetector } from "react-resize-detector";

// sky from https://codepen.io/sharnajh/pen/WNvppRy

export default function Stars() {
    const [render, setRender] = useState(false);
    const router = useRouter();

    const skyDiv = useRef(null);

    const [layout, setLayout] = useState("w-full h-2/3 xl:w-2/3 h-full");

    const onResize = useCallback(() => {
        // if (log) {
        //     console.log("resized! " + width);
        // }
        setRender(false);
        setTimeout(() => setRender(true));
    }, []);

    const { width, height, ref } = useResizeDetector({
        targetRef: skyDiv,
        refreshMode: "debounce",
        refreshRate: 1000,
        onResize,
    });

    const [num, setNum] = useState(25);
    let [vw, setVw] = useState(0);
    let [vh, setVh] = useState(0);

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
        return Math.floor(Math.random() * Math.floor(vw)).toString();
    };
    const getRandomY = () => {
        return Math.floor(Math.random() * Math.floor(vh)).toString();
    };

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

    useEffect(() => {
        setVw(width ? width : 0);
        setVh(height ? height : 0);
        console.log(`rendering: vw:${vw} vh:${vh}`);
    }, [width, height, vw, vh]);

    return (
        <>
            {render && (
                <div className="relative inset-0 flex h-full w-full ">
                    <AnimatePresence>
                        <motion.svg
                            ref={skyDiv}
                            id="sky"
                            initial="hidden"
                            animate="visible"
                            variants={skyVariants}
                            exit={{ opacity: 0 }}
                            className={`${layout} pointer-events-none relative  flex-1 overflow-hidden `}
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
                            <span className="text-5xl text-white">
                                Width:{width} | Height:{height}
                            </span>
                        </motion.svg>
                    </AnimatePresence>
                </div>
            )}
        </>
    );
}
