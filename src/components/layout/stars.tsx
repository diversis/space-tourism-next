import useWindowSize from "@/lib/hooks/use-window-size";
import anime from "animejs";
import { useEffect, useState } from "react";

// sky from https://codepen.io/sharnajh/pen/WNvppRy

export default function Stars() {
    const { isMobile, isTablet, isDesktop } = useWindowSize();
    const [render, setRender] = useState(false);

    let num = 25;
    let [vw, setVw] = useState(0);
    let [vh, setVh] = useState(0);

    const starryNight = () => {
        anime({
            targets: ["#sky .star"],
            opacity: [
                {
                    duration: 700,
                    value: "0",
                },
                {
                    duration: 700,
                    value: "1",
                },
            ],
            easing: "linear",
            loop: true,
            delay: (el, i) => 100 * i,
        });
    };
    const shootingStars = () => {
        anime({
            targets: ["#shootingstars"],
            easing: "linear",
            loop: true,
            delay: (el, i) => 2000 * i,
            opacity: [
                {
                    duration: 700,
                    value: "1",
                },
            ],
            width: [
                {
                    value: "150px",
                },
                {
                    value: "0px",
                },
            ],
            translateX: 350,
        });
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
        starryNight();
        shootingStars();
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
    }, [render, isDesktop]);

    return (
        <>
            {render && (
                <svg id="sky">
                    {[...Array(num)].map((x, y) => (
                        <circle
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
                        />
                    ))}
                </svg>
            )}
        </>
    );
}
