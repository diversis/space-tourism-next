import Logo from "@/components/shared/icons/logo.svg";
import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { type NextRouter, useRouter } from "next/router";

export default function Navbar() {
    const router: NextRouter = useRouter();
    return (
        <header className="relative flex h-[6rem] w-full flex-row  items-center justify-between gap-x-16 overflow-hidden xl:mt-10">
            <Logo className="ml-12 grid  flex-none basis-12 place-items-center " />
            <div className="relative m-0 hidden  h-0  flex-grow !border-t-transparent p-0 after:absolute after:-right-24 after:left-0 after:top-0 after:z-10  after:m-0 after:block after:h-0 after:w-[calc(100%+6rem)] after:border-b after:border-solid after:border-secondary/25 xl:block xl:after:content-['']" />
            <nav className=" h-full bg-secondary/5 px-32 backdrop-blur-sm">
                <ul className="hidden h-full  md:flex md:flex-row md:gap-x-12">
                    {NAV_LINKS.map((item, id) => {
                        return (
                            <li
                                key={`nav-${item.name}`}
                                className={`${
                                    router && router.pathname == item.url
                                        ? "border-secondary"
                                        : "border-transparent "
                                } grid h-full place-items-center border-b-[3px] uppercase text-secondary transition-colors [&:is(:hover,:active)]:border-secondary/50   [&>a]:py-8 [&>a]:text-center`}
                            >
                                <Link href={item.url}>
                                    <span className="inline-block pr-2 font-bold tracking-wider md:hidden xl:inline-block">
                                        {id.toLocaleString("en-US", {
                                            minimumIntegerDigits: 2,
                                            useGrouping: false,
                                        })}
                                    </span>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
