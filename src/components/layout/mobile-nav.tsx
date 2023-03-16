import { AnimatePresence, motion } from "framer-motion";
import GlowWrap from "../shared/glowwrap";
import Hamburger from "@/components/shared/icons/hamburger.svg";
import { type Dispatch, type SetStateAction } from "react";

export default function MobileNav({
    showMenu,
    setShowMenu,
}: {
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <AnimatePresence>
            <GlowWrap
                rx="25px"
                className="fixed right-8 top-8 h-8 w-8"
                offset="8px"
            >
                <motion.button
                    onClick={() => setShowMenu(!showMenu)}
                    onBlur={() => {
                        setShowMenu(false);
                    }}
                    aria-expanded={showMenu}
                    className="mobile-nav-toggle stroke:white fixed right-8 top-8 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full  transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
                >
                    <span className="sr-only">Menu</span>
                    <Hamburger />
                </motion.button>
            </GlowWrap>
        </AnimatePresence>
    );
}
