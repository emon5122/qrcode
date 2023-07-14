import Link from "next/link";
import { ModeToggle } from "./themeToggle";

const Nav = () => {
    return (
        <div
            className="flex justify-between py-2 bg-accent/10 items-center fixed top-0 w-full  rounded-b-md backdrop-blur-[2px]"
            style={{ boxShadow: ".5em -0.001em 1em" }}
        >
            <h1 className="text-center font-extrabold ml-10 text-xl">
                <Link href="/"> Nexis QR </Link>
            </h1>
            <ModeToggle />
        </div>
    );
};
export default Nav;
