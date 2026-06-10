
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
                setShowNavbar(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: 0 }}
                animate={{
                    y: showNavbar ? 0 : -120,
                }}
                transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                }}
                className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4"
            >
                <div
                    className="h-16 w-full rounded-2xl border border-white/10 bg-black/65 backdrop-blur-2xl shadow-[0_0_50px_rgba(217,70,239,0.08)] flex items-center justify-between px-6"
                >
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 8, scale: 1.08 }}
                            transition={{ duration: 0.2 }}
                            className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-purple-500flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.35)]">
                            <span className="text-white font-bold">W</span>
                        </motion.div>

                        <motion.span
                            whileHover={{ scale: 1.03 }}
                            className="text-lg font-bold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent"
                        >
                            WorkOrbit
                        </motion.span>
                    </Link>

                    {/* Desktop Nav */}
                    <div
                        className="hidden lg:flex items-center rounded-2xl border border-white/5 bg-white/3 px-2 py-2"
                    >
                        {navLinks.map((item) => (
                            <motion.div
                                key={item.href}
                                whileHover={{ y: -2 }}
                            >
                                <Link
                                    href={item.href}
                                    className="px-5 py-2 text-sm text-zinc-400 transition-all hover:text-fuchsia-300"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-5">
                        <Link
                            href="/signin"
                            className="text-sm text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-fuchsia-300 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.4)]"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/signup"
                            className="text-sm text-fuchsia-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-fuchsia-300 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.4)]"
                        >
                            Sign Up
                        </Link>

                        <motion.div
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                        >
                            <Link href="/signup" className="group relative overflow-hidden rounded-xl bg-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(217,70,239,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.55)]">

                                <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
                                    <motion.div
                                        initial={{ x: -200 }}
                                        animate={{ x: 400 }}
                                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }}
                                        className="absolute -top-10 -left-20 h-40 w-12 rotate-45 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                                    />
                                </div>

                                <span className="relative z-10">Get Started</span>

                            </Link>
                        </motion.div>
                    </div>

                    {/*======================= Mobile Toggle=============================== */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="lg:hidden"
                    >
                        <div className="space-y-1.5">
                            <span className="block h-[2px] w-6 bg-white rounded-full" />
                            <span className="block h-[2px] w-6 bg-white rounded-full" />
                            <span className="block h-[2px] w-6 bg-white rounded-full" />
                        </div>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-24 left-4 right-4 z-40 rounded-3xl border border-fuchsia-500/10 bg-[#101014] shadow-[0_10px_50px_rgba(217,70,239,0.12)] backdrop-blur-3xl p-6 lg:hidden"
                    >
                        <div className="flex flex-col gap-3">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenu(false)}
                                    className="rounded-xl px-4 py-3 text-fuchsia-300 transition-all duration-300 hover:translate-x-2 hover:bg-fuchsia-500/10 hover:text-fuchsia-200 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)]"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="mt-2 border-t border-white/10 pt-5 flex flex-col gap-3">
                                <Link
                                    href="/signin"
                                    className="rounded-xl border border-fuchsia-500/20 py-3 text-center text-fuchsia-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400 hover:bg-fuchsia-500/10 hover:text-fuchsia-200"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/signup"
                                    className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 py-3 text-center text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(217,70,239,0.45)]"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

