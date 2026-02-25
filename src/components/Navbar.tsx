import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./themeToggle";

const Nav = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
            <div className="container flex h-14 items-center justify-between max-w-6xl mx-auto px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 font-bold text-lg transition-opacity hover:opacity-80"
                >
                    <Image
                        src="/logo.svg"
                        alt="QR Studio"
                        width={28}
                        height={28}
                        className="rounded-md"
                    />
                    <span className="hidden sm:inline">QR Studio</span>
                </Link>
                <ModeToggle />
            </div>
        </header>
    );
};
export default Nav;
