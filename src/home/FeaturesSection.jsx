"use client";

import { motion } from "framer-motion";
import { Search, ChartColumn, Building2, Bookmark, MousePointerClick, FileText, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Smart Search",
        description: "Find your ideal job with advanced filters.",
    },
    {
        icon: ChartColumn,
        title: "Salary Insights",
        description: "Get real salary data to negotiate confidently.",
    },
    {
        icon: Building2,
        title: "Top Companies",
        description: "Apply to vetted companies that are hiring.",
    },
    {
        icon: Bookmark,
        title: "Saved Jobs",
        description: "Manage apps and favorites on your dashboard.",
    },
    {
        icon: MousePointerClick,
        title: "One-Click Apply",
        description: "Simplify your job applications for an easier process.",
    },
    {
        icon: FileText,
        title: "Resume Builder",
        description: "Create professional resumes with modern templates.",
    },
    {
        icon: ShieldCheck,
        title: "Skill-Based Matching",
        description: "Discover jobs that match your skills and experience.",
    },
    {
        icon: TrendingUp,
        title: "Career Resources",
        description: "Boost your career with quick interview tips.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="px-4 py-24">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fuchsia-400">
                        Features
                    </p>

                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        Everything you need
                        <br />
                        to succeed
                    </h2>
                </motion.div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="group flex gap-4 rounded-2xl border border-white/5 bg-[#111111]/50 p-4 transition-all duration-300 hover:border-fuchsia-500/20 hover:bg-[#151515] hover:shadow-[0_0_30px_rgba(217,70,239,0.08)]"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black">
                                    <Icon size={20} className="text-fuchsia-400" />
                                </div>

                                <div>
                                    <h3 className="mb-2 font-medium text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm leading-6 text-zinc-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}