import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <h2 className="bg-linear-to-r from-fuchsia-500 via-pink-500 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 hover:scale-105">
                                WorkOrbit
                            </h2>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-zinc-500">
                            The AI-powered career platform built for professionals,
                            recruiters, and companies.
                        </p>

                        <div className="flex items-center gap-3">
                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:bg-fuchsia-600 hover:text-white hover:shadow-[0_0_20px_rgba(217,70,239,0.45)]"
                            >
                                <FaFacebookF size={14} />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:bg-fuchsia-600 hover:text-white hover:shadow-[0_0_20px_rgba(217,70,239,0.45)]"
                            >
                                <FaPinterestP size={14} />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:bg-fuchsia-600 hover:text-white hover:shadow-[0_0_20px_rgba(217,70,239,0.45)]"
                            >
                                <FaLinkedinIn size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold text-fuchsia-400">
                            Product
                        </h3>

                        <div className="flex flex-col gap-3">
                            {["Browse Jobs", "AI Career Match", "Companies", "Salary Insights"].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-sm text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-fuchsia-300"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold text-fuchsia-400">
                            Navigation
                        </h3>

                        <div className="flex flex-col gap-3">
                            {["Help Center", "Career Library", "Contact Us"].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-sm text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-fuchsia-300"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold text-fuchsia-400">
                            Resources
                        </h3>

                        <div className="flex flex-col gap-3">
                            {["Brand Guidelines", "Newsroom"].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-sm text-zinc-500 transition-all duration-300 hover:translate-x-1 hover:text-fuchsia-300"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-center text-xs text-zinc-600 md:flex-row">
                    <p>Copyright © 2026 — WorkOrbit</p>

                    <div className="flex items-center gap-4">
                        <Link href="#" className="transition-colors duration-300 hover:text-fuchsia-300">
                            Terms & Conditions
                        </Link>

                        <Link href="#" className="transition-colors duration-300 hover:text-fuchsia-300">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}