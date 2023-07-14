import Link from "next/link";
import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer
            style={{ boxShadow: ".5em -0.001em 1em" }}
            className="flex justify-center py-2 bg-accent/10 mt-4 bottom-0 fixed w-full rounded-t-md backdrop-blur-[2px]"
        >
            <p className="flex flex-row gap-2">
                Made with
                {<Heart className="text-destructive fill-destructive" />}
                by
                <Link href={"https://ihemon.me"}>
                    <span className="hover:text-primary/40 transition-all duration-300 ease-in-out">
                        Istiak Hassan Emon
                    </span>
                </Link>
            </p>
        </footer>
    );
};
export default Footer;
