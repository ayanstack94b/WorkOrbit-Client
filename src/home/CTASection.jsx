
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="relative overflow-hidden px-4 py-32">
            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.25, 0.5, 0.25],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-250px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-fuchsia-600/20 blur-[180px]"
            />

            {/* Floating Stars */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                        duration: 4 + (i % 5),
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute h-[2px] w-[2px] rounded-full bg-fuchsia-400"
                    style={{
                        left: `${(i * 13) % 100}% `,
                        top: `${(i * 11) % 100}% `,
                    }}
                />
            ))}

            {/* Dome Grid */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
                <svg
                    viewBox="0 0 1200 500"
                    className="h-[500px] w-full max-w-[1600px] opacity-40"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="domeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#d946ef" stopOpacity="0" />
                            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                            <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {[...Array(12)].map((_, i) => (
                        <motion.path
                            key={`arc - ${i} `}
                            d={`M ${100 + i * 20} 500 Q 600 ${40 + i * 25} ${1100 - i * 20} 500`}
                            fill="none"
                            stroke="url(#domeGlow)"
                            strokeWidth="1"
                            animate={{ opacity: [0.1, 0.35, 0.1] }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}

                    {[...Array(19)].map((_, i) => (
                        <motion.line
                            key={`line - ${i} `}
                            x1="600"
                            y1="500"
                            x2={40 + i * 60}
                            y2="0"
                            stroke="url(#domeGlow)"
                            strokeWidth="1"
                            animate={{ opacity: [0.05, 0.25, 0.05] }}
                            transition={{
                                duration: 6 + i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center text-center"
                >
                    <h2 className="max-w-4xl text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                        Your next role is
                        <br />
                        already looking for you
                    </h2>

                    <p className="mt-6 max-w-2xl text-zinc-400">
                        Build your profile in minutes. The right opportunities are already searching for candidates like you.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/signup"
                            className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                        >
                            Create Free Account
                        </Link>

                        <Link
                            href="/pricing"
                            className="rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-6 py-3 font-medium text-fuchsia-300 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400 hover:bg-fuchsia-500/20 hover:shadow-[0_0_30px_rgba(217,70,239,0.2)]"
                        >
                            View Pricing
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

