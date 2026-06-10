"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Building2, Users, Star } from "lucide-react";

const stats = [
    {
        value: "50K",
        label: "Active Jobs",
        icon: BriefcaseBusiness,
    },
    {
        value: "12K",
        label: "Companies",
        icon: Building2,
    },
    {
        value: "2M",
        label: "Job Seekers",
        icon: Users,
    },
    {
        value: "97%",
        label: "Satisfaction Rate",
        icon: Star,
    },
];

export default function StatsSection() {
    return (
        <section className="relative overflow-hidden px-4 py-24">
            <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-fuchsia-600/15 blur-[150px]" />

            <div className="mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center text-3xl font-semibold text-white md:text-5xl"
                >
                    Assisting over 15,000 job seekers
                    <br />
                    find their dream positions.
                </motion.h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl border border-white/10 bg-[#111111] p-6 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/20 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]"
                            >
                                <Icon size={18} className="mb-8 text-fuchsia-400" />

                                <h3 className="mb-2 text-5xl font-bold text-white">
                                    {stat.value}
                                </h3>

                                <p className="text-sm text-zinc-400">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}