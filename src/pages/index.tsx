import Balancer from "react-wrap-balancer";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Explore from "@/lib/buttons/explore";

export default function Home() {
    const h5Text = "So, you want to travel to";
    const h1Text = "Space";
    const longText =
        "Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!";

    const sentence: Variants = {
        hidden: {
            opacity: 1,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.08,
            },
        },
    };
    const letter: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };
    const article: Variants = {
        hidden: {
            opacity: 1,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delay: 6.5,
                when: "beforeChildren",
            },
        },
    };
    const title: Variants = {
        hidden: {
            mask: "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
            maskPosition: "70% 0%",
            maskSize: "800%",
            WebkitMask:
                "linear-gradient(to left, transparent 40%,black 50%, black 60%,transparent 80%)",
            WebkitMaskPosition: "70% 0%",
            WebkitMaskSize: "800%",
            opacity: 1,
        },
        visible: {
            opacity: 1,

            maskPosition: "45% 0%",

            WebkitMaskPosition: "45% 0%",

            transition: {
                duration: 10,
                type: "tween",
                ease: "easeOut",
                delay: 2.75,
                // times: [0, 0.2, 0.3, 1],
            },
        },
    };
    return (
        <>
            <div className="flex h-full w-full flex-row">
                <div className="flex-1 xl:basis-[10.4375rem]"></div>
                <div className="container flex h-full flex-col items-center justify-between gap-y-4 overflow-y-clip px-6 pb-12  xl:grid xl:grid-cols-2 xl:grid-rows-[1fr_8rem] xl:place-items-end xl:justify-items-start xl:py-0 ">
                    <AnimatePresence mode="sync">
                        <motion.article
                            className="flex flex-col gap-y-4 pt-12 text-center xl:text-left"
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h5
                                className="tracking-widest text-accent"
                                variants={sentence}
                            >
                                {h5Text &&
                                    h5Text.split("").map((char, index) => {
                                        return (
                                            <motion.span
                                                key={char + "-" + index}
                                                variants={letter}
                                            >
                                                {char}
                                            </motion.span>
                                        );
                                    })}
                            </motion.h5>
                            <motion.h1
                                variants={title}
                                className="spicy linear-mask relative mb-[0.15em] w-full bg-conic bg-[size:800%+800%] bg-no-repeat"
                            >
                                {h1Text}
                            </motion.h1>
                            <motion.p
                                className="text-shadow max-w-[46ch] text-accent"
                                variants={article}
                            >
                                <Balancer ratio={0.5}>
                                    {longText &&
                                        longText
                                            .split("")
                                            .map((char, index) => {
                                                return (
                                                    <motion.span
                                                        key={char + "-" + index}
                                                        variants={letter}
                                                    >
                                                        {char}
                                                    </motion.span>
                                                );
                                            })}
                                </Balancer>
                            </motion.p>
                        </motion.article>
                    </AnimatePresence>
                    <div className="relative h-min w-min justify-self-end ">
                        <Explore />
                    </div>
                </div>
                <div className="flex-1 xl:basis-[10.4375rem]"></div>
            </div>
        </>
    );
}
