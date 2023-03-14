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
            <div
                className=" grid  h-full w-full grid-cols-[1rem_1fr_1rem] grid-rows-[1fr_1fr_1rem] gap-y-8
                overflow-hidden [grid-template-areas:'._hero_.''._cta_.''._._.'] md:grid-cols-[2.4375rem_1fr_2.4375rem] 
                md:grid-rows-[1fr_1fr_3.625rem] 
                xl:w-fit
                xl:grid-cols-[10.4375rem_minmax(0,48rem)_minmax(0,48rem)_10.4375rem] 
                xl:grid-rows-[1fr_8rem] xl:items-start
                xl:[grid-template-areas:'._hero_cta_.''._._._.']"
            >
                {/* Hero */}

                <AnimatePresence mode="sync">
                    <motion.article
                        className="flex flex-col items-center justify-start gap-y-4 self-end pt-12 text-center [grid-area:hero] xl:items-start xl:text-left"
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
                            tabIndex={0}
                            variants={title}
                            className="spicy linear-mask relative mb-[0.15em] w-full bg-conic bg-[size:800%+800%] bg-no-repeat"
                        >
                            {h1Text}
                        </motion.h1>
                        <motion.p
                            tabIndex={0}
                            className="text-shadow max-w-[46ch] text-accent"
                            variants={article}
                        >
                            <Balancer ratio={0.5}>
                                {longText &&
                                    longText.split("").map((char, index) => {
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
                {/* CTA */}
                <div className="relative h-min w-min self-end justify-self-center [grid-area:cta] xl:justify-self-end">
                    <Explore />
                </div>
            </div>
        </>
    );
}
