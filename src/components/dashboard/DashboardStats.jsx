"use client";

import { motion } from "framer-motion";

export default function DashboardStats({ stats }) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <motion.div
                        key={stat.title}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-[0_0_40px_rgba(217,70,239,0.18)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-fuchsia-500/0 to-fuchsia-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-fuchsia-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5" />

                        <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 transition-all duration-300 group-hover:bg-fuchsia-500/20 group-hover:shadow-[0_0_25px_rgba(217,70,239,0.35)]">
                            <Icon size={22} />
                        </div>

                        <p className="relative z-10 text-sm text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
                            {stat.title}
                        </p>

                        <h3 className="relative z-10 mt-2 text-3xl font-bold text-white">
                            {stat.value}
                        </h3>
                    </motion.div>
                );
            })}
        </div>
    );
}