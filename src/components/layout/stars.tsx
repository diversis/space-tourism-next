import useWindowSize from "@/lib/hooks/use-window-size";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import { LoadingContext } from "../shared/loading-context";

// sky from https://codepen.io/sharnajh/pen/WNvppRy

export default function Stars() {
    const [render, setRender] = useState(false);
    const router = useRouter();
    const loading = useContext(LoadingContext);
    const skyDiv = useRef<SVGSVGElement>(null);
    const [path, setPath] = useState(router.pathname);
    const [layout, setLayout] = useState("w-full h-2/3 xl:w-2/3 h-full");

    const [num, setNum] = useState(25);
    let [vw, setVw] = useState(0);
    let [vh, setVh] = useState(0);

    const skyVari: Variants = {
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
                delay: 1,

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
    const switchLayout = useCallback(() => {
        setRender(false);
        switch (path) {
            case "/":
                setLayout("w-full h-2/3 xl:w-2/3 xl:h-full");
                setNum(35);
                break;
            case "/destination":
                setLayout("h-full w-full");
                setNum(60);
                break;
            case "/crew":
                setLayout("h-1/4 w-full bottom-0");
                setNum(25);
                break;
            case "/technology":
                setLayout("h-full w-full");
                setNum(60);
                break;
        }
        setVw(skyDiv?.current ? skyDiv?.current.clientWidth : 0);
        setVh(skyDiv?.current ? skyDiv?.current.clientHeight : 0);

        setRender(true);
    }, [path, skyDiv]);

    useEffect(() => {
        if (!loading) {
            setPath(router.pathname);

            switchLayout();
        }
    }, [router.pathname, switchLayout, loading]);

    return (
        <>
            <AnimatePresence mode="wait" initial={false}>
                {!loading && render && (
                    <div className="absolute inset-0">
                        <motion.svg
                            ref={skyDiv}
                            id="sky"
                            initial="hidden"
                            animate="visible"
                            variants={skyVari}
                            exit={{ opacity: 0 }}
                            className={`${layout} pointer-events-none  relative m-0 overflow-hidden p-0`}
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
                                    className=""
                                    variants={stars}
                                />
                            ))}
                        </motion.svg>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
