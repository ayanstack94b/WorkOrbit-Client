"use client";

import { motion } from "framer-motion";
import { Search, MapPin, BriefcaseBusiness } from "lucide-react";

export default function Banner() {
    return (
        <section className="relative overflow-hidden px-4 pt-32 pb-20">
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-[120px]" />
            </div>

            <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-white/5 px-5 py-2 backdrop-blur-xl"
                >
                    <BriefcaseBusiness size={16} className="text-fuchsia-400" />

                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-300">
                        50,000+ New Jobs This Month
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl text-4xl font-bold text-white sm:text-5xl md:text-6xl"
                >
                    Find Your Dream Job Today
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base"
                >
                    WorkOrbit connects top talent with world-class companies.
                    Browse thousands of curated opportunities and land your next
                    role faster.
                </motion.p>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 w-full max-w-4xl"
                >
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_0_30px_rgba(217,70,239,0.08)] md:flex-row">
                        <div className="flex flex-1 items-center gap-3 px-5 py-4">
                            <Search size={18} className="text-zinc-500" />

                            <input
                                type="text"
                                placeholder="Job title, skill or company"
                                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="hidden w-px bg-white/10 md:block" />

                        <div className="flex flex-1 items-center gap-3 px-5 py-4">
                            <MapPin size={18} className="text-zinc-500" />

                            <input
                                type="text"
                                placeholder="Location or Remote"
                                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="m-2 flex items-center justify-center rounded-xl bg-fuchsia-600 px-5 py-4 text-white shadow-[0_0_25px_rgba(217,70,239,0.35)]"
                        >
                            <Search size={18} />
                        </motion.button>
                    </div>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <span className="text-sm text-zinc-500">
                            Trending:
                        </span>

                        {[
                            "Frontend Developer",
                            "Product Designer",
                            "AI Engineer",
                            "DevOps Engineer",
                        ].map((tag) => (
                            <motion.button
                                key={tag}
                                whileHover={{ y: -3 }}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 transition-colors hover:border-fuchsia-500/30 hover:text-fuchsia-300"
                            >
                                {tag}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}