import { useCallback, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

export default function GlowWrap({
    children,
    rx = "0px",
    speed = "1200",
    offset = "0px",
    travel = "-3.5",
    blur = "5px",
    thickness = "2px",
    length = "20px",
    className = "",
    opacity = "0",
    lineColor = "stroke-accent",
    blurColor = "stroke-accent",
    ...props
}: // log = false,
{
    children?: React.ReactNode | React.ReactNode[];

    rx?: string;
    speed?: string;
    offset?: string;
    travel?: string;
    blur?: string;
    thickness?: string;
    length?: string;
    className?: string;
    opacity?: string;
    lineColor?: string;
    blurColor?: string;
    props?: any;
}) {
    let [render, setRender] = useState(false);

    const onResize = useCallback(() => {
        setRender(false);
        setTimeout(() => setRender(true));
    }, []);

    const { width, height, ref } = useResizeDetector({
        handleHeight: false,
        refreshMode: "debounce",
        refreshRate: 1000,
        onResize,
    });

    useEffect(() => setRender(true), []);
    return (
        <>
            <div
                ref={ref}
                className={"glow-effect " + className}
                style={
                    {
                        ["--animation-speed"]: speed + "ms",
                        ["--glow-offset"]: offset,
                        ["--glow-blur-size"]: blur,
                        ["--glow-line-thickness"]: thickness,
                        ["--glow-line-length"]: length,
                        ["--final-opacity"]: opacity,
                        ["--travel"]: travel,
                    } as React.CSSProperties
                }
                {...props}
            >
                {children}

                {render && (
                    <svg className="glow-container">
                        <rect
                            pathLength="100"
                            className={"glow-blur " + blurColor}
                            rx={rx}
                            width="100"
                            height="100"
                        ></rect>
                        <rect
                            pathLength="100"
                            className={"glow-line " + lineColor}
                            rx={rx}
                            width="100"
                            height="100"
                        ></rect>
                    </svg>
                )}
            </div>
        </>
    );
}
