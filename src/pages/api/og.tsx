/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
    runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title") || "Frontend Mentor";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    backgroundImage:
                        "linear-gradient(0.45turn,#fff ,hsl(231, 77%, 90%) ,#fff)",
                }}
            >
                <img
                    src={new URL(
                        "../../../public/image/home/background-home-desktop.jpg",
                        import.meta.url,
                    ).toString()}
                    alt="Space tourism Home"
                    tw="w-20 h-20 mb-4 opacity-95"
                />
                <h1
                    style={{
                        fontSize: "100px",
                        fontFamily: "Bellefair",
                        background: "#fff",
                        backgroundClip: "text",
                        color: "transparent",
                        lineHeight: "5rem",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {title}
                </h1>
            </div>
        ),
    );
}
