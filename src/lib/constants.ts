import { Variants } from "framer-motion";

export const NAV_LINKS = [
    { name: "Home", url: "/" },
    { name: "Destination", url: "/destination" },
    { name: "Crew", url: "/crew" },
    { name: "Technology", url: "/technology" },
];

export const IMAGE_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 1,
            type: "tween",
            ease: "backIn",
            delay: -0.5,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.7,
            type: "tween",
            ease: "backIn",
        },
    },
};

export const TABS_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};
export const ARTICLE_VARIANTS: Variants = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
};
export const HR_VARIANTS: Variants = {
    hidden: {
        x: "100%",
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
    },
};
export const SECTION_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        x: "100%",
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            mass: 0.3,
            staggerChildren: 0.5,
        },
    },
};
export const SECTION_LEFT_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        x: "-100%",
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            mass: 0.3,
            staggerChildren: 0.5,
        },
    },
};
export const TAB_TITLE_VARIANTS: Variants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.3,
            type: "tween",
            ease: "easeOut",
        },
    },
    visible: {
        opacity: 1,

        transition: {
            duration: 0.7,
            type: "tween",
            ease: "backOut",
        },
    },
};
