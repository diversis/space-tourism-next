import Logo from "@/components/shared/icons/logo.svg";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { type NextRouter, useRouter } from "next/router";
import GlowWrap from "../shared/glowwrap";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useWindowSize from "@/lib/hooks/use-window-size";
import MobileNav from "./mobile-nav";

export default function Navbar() {
    const { isMobile } = useWindowSize();
    const router: NextRouter = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
            <header className="relative flex h-[6rem] w-full flex-row items-center  justify-between gap-x-16 [grid-area:1/1] xl:mt-10">
                <Logo className="ml-6 grid flex-none basis-12 place-items-center md:ml-[2.4375rem] xl:ml-[3.4375rem]" />
                <div className="relative m-0 hidden  h-0  flex-grow !border-t-transparent p-0 after:absolute after:-right-24 after:left-0 after:top-0 after:z-10  after:m-0 after:block after:h-0 after:w-[calc(100%+6rem)] after:border-b after:border-solid after:border-secondary/25 xl:block xl:after:content-['']" />
                {/* Desktop and Tablet navigation menu */}
                <nav
                    aria-label="main navigation"
                    className="hidden h-full overflow-hidden bg-secondary/5 backdrop-blur-sm md:block md:px-12 xl:px-32 "
                >
                    <ul className="hidden h-full  md:flex md:flex-row md:gap-x-[2.25rem] xl:gap-x-12">
                        {NAV_LINKS.map((item, id) => {
                            return (
                                <li
                                    key={`nav-${item.name}`}
                                    className="grid h-full place-items-center  uppercase text-secondary transition-colors "
                                >
                                    <GlowWrap
                                        rx="8px"
                                        offset="12px"
                                        className=""
                                    >
                                        <Link
                                            href={item.url}
                                            className={`${
                                                router &&
                                                router.pathname == item.url
                                                    ? "border-secondary "
                                                    : "border-transparent "
                                            } peer/link text-shadow z-30 self-center text-center [&:is(:hover,:focus)]:border-secondary/50`}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="inline-block pr-2 font-bold tracking-wider md:hidden xl:inline-block"
                                            >
                                                {id.toLocaleString("en-US", {
                                                    minimumIntegerDigits: 2,
                                                    useGrouping: false,
                                                })}
                                            </span>
                                            {item.name}
                                        </Link>
                                        <hr
                                            className={`${
                                                router &&
                                                router.pathname == item.url
                                                    ? "scale-100 border-secondary"
                                                    : "scale-0 border-transparent"
                                            } absolute -bottom-9 h-0 w-full self-end border-t-[3px] transition-all duration-300  peer-hover/link:scale-100 peer-hover/link:border-secondary/50 peer-focus/link:scale-100 peer-focus/link:border-secondary/50`}
                                        ></hr>
                                    </GlowWrap>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="z-[9000] pr-8 md:hidden">
                    <MobileNav setShowMenu={setShowMenu} showMenu={showMenu} />
                </div>
                {/* Mobile navigation menu */}
                <AnimatePresence>
                    {isMobile && showMenu && (
                        <motion.nav
                            aria-label="mobile navigation"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            transition={{
                                duration: 0.5,
                                type: "tween",
                                ease: "backIn",
                            }}
                            exit={{ x: "100%" }}
                            className="fixed right-0 top-0 z-[1000] h-full bg-primary/25 backdrop-blur-lg md:hidden"
                        >
                            <ul className="mt-24 flex h-full w-full flex-col md:hidden md:gap-y-12">
                                {NAV_LINKS.map((item, id) => {
                                    return (
                                        <li
                                            key={`nav-${item.name}`}
                                            className={`grid w-full place-items-center  uppercase text-secondary transition-colors `}
                                        >
                                            <Link
                                                href={item.url}
                                                className="peer/link text-shadow flex w-full flex-row items-center px-16 py-8 text-center [grid-area:1/1]"
                                            >
                                                <span className="inline-block pr-2 font-bold tracking-wider md:hidden xl:inline-block">
                                                    {id.toLocaleString(
                                                        "en-US",
                                                        {
                                                            minimumIntegerDigits: 2,
                                                            useGrouping: false,
                                                        },
                                                    )}
                                                </span>
                                                {item.name}
                                            </Link>
                                            <span
                                                className={`${
                                                    router &&
                                                    router.pathname == item.url
                                                        ? "scale-100 border-secondary"
                                                        : "scale-0 border-transparent"
                                                } h-full w-0 justify-self-start border-l-[3px] transition-all duration-300 [grid-area:1/1] peer-hover/link:scale-100 peer-hover/link:border-secondary/50 peer-focus/link:scale-100 peer-focus/link:border-secondary/50`}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
