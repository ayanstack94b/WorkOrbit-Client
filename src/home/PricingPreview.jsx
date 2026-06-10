"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, ChartColumn, Zap, Check } from "lucide-react";

const plans = [
    {
        icon: Crown,
        name: "Starter",
        monthly: 0,
        yearly: 0,
        features: ["Daily AI match brief (top 5)", "Verified salary bands", "Company insight dashboards", "1-click apply"],
    },
    {
        icon: ChartColumn,
        name: "Growth",
        monthly: 17,
        yearly: 13,
        featured: true,
        features: ["Daily AI match brief (top 5)", "Verified salary bands", "Company insight dashboards", "Unlimited applications"],
    },
    {
        icon: Zap,
        name: "Premium",
        monthly: 99,
        yearly: 79,
        features: ["Everything in Growth", "Multi-profile portfolios", "Shared talent rooms", "Recruiter visibility boost"],
    },
];

export default function PricingPreview() {
    const [billing, setBilling] = useState("monthly");

    return (
        <section className="px-4 py-24">
            <div className="mx-auto max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-fuchsia-400">
                        Pricing
                    </p>

                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        Pay for the leverage,
                        <br />
                        not the listings
                    </h2>
                </motion.div>

                {/* Toggle */}
                <div className="mb-14 flex justify-center">
                    <div className="flex items-center rounded-full border border-white/10 bg-[#111111] p-1">
                        <button
                            onClick={() => setBilling("monthly")}
                            className={`rounded-full px-4 py-2 text-sm transition-all ${billing === "monthly"
                                    ? "bg-white text-black"
                                    : "text-zinc-400"
                                }`}
                        >
                            Monthly
                        </button>

                        <button
                            onClick={() => setBilling("yearly")}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${billing === "yearly"
                                    ? "bg-white text-black"
                                    : "text-zinc-400"
                                }`}
                        >
                            Yearly
                            <span className="rounded-full bg-fuchsia-600 px-2 py-0.5 text-[10px] text-white">
                                25%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className={`rounded-3xl border p-6 transition-all duration-300 ${plan.featured
                                        ? "border-fuchsia-500/20 bg-gradient-to-b from-white/10 to-[#111111] shadow-[0_0_40px_rgba(217,70,239,0.15)]"
                                        : "border-white/10 bg-[#111111]"
                                    }`}
                            >
                                <div className="mb-8 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black">
                                            <Icon size={18} className="text-fuchsia-400" />
                                        </div>

                                        <h3 className="text-xl font-semibold text-white">
                                            {plan.name}
                                        </h3>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-5xl font-bold text-white">
                                            ${billing === "monthly" ? plan.monthly : plan.yearly}
                                        </span>

                                        <span className="text-sm text-zinc-500">
                                            /month
                                        </span>
                                    </div>
                                </div>

                                <p className="mb-6 text-sm text-zinc-400">
                                    Start building your insights hub:
                                </p>

                                <div className="mb-10 space-y-4">
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex h-5 w-5 items-center justify-center rounded bg-white/10">
                                                <Check size={12} className="text-fuchsia-300" />
                                            </div>

                                            <span className="text-sm text-zinc-400">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/pricing"
                                    className={`flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${plan.featured
                                            ? "bg-white text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                                            : "bg-white/10 text-white hover:bg-fuchsia-600 hover:text-white"
                                        }`}
                                >
                                    Choose This Plan
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}