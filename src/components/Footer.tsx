import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t py-5 mt-auto">
            <div className="container max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-1.5">
                    A free tool by
                    <Link
                        href="https://nexisltd.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                        Nexis LTD
                    </Link>
                </p>
                <p className="flex items-center gap-1.5">
                    Made with
                    <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                    by
                    <Link
                        href="https://ihemon.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                        Istiak Hassan Emon
                    </Link>
                </p>
            </div>
        </footer>
    );
};
export default Footer;
