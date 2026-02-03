import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-secondary pt-24 pb-12 overflow-hidden relative">
            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <div className="flex flex-wrap justify-between gap-12 lg:gap-24 mb-32">
                    <div className="max-w-md">
                        <span className="text-3xl font-orbitron font-bold text-foreground block mb-6">
                            oppspaces
                        </span>
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                            The new standard for hiring and getting hired. <br />
                            Built for the ambitious.
                        </p>
                    </div>

                    <div className="flex gap-16 lg:gap-32 flex-wrap">
                        <div>
                            <h3 className="font-bold text-foreground mb-6 text-lg">Company</h3>
                            <ul className="space-y-4 text-muted-foreground">
                                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                                <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-6 text-lg">Social</h3>
                            <ul className="space-y-4 text-muted-foreground">
                                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground mb-6 text-lg">Legal</h3>
                            <ul className="space-y-4 text-muted-foreground">
                                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-foreground/10 pt-12 text-center sm:text-left">
                    <h2 className="text-[12vw] leading-none font-bold text-foreground/5 font-orbitron select-none text-center">
                        oppspaces
                    </h2>
                    <div className="flex justify-between items-center mt-8 text-sm text-muted-foreground font-medium">
                        <p>© 2025 Oppspaces Inc.</p>
                        <p>Made in India</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
