"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, BriefcaseBusiness, Euro } from "lucide-react";

const jobs = [
    { title: "Frontend Developer", location: "New York, USA", type: "Hybrid", salary: "€25–€40/hour" },
    { title: "Backend Engineer", location: "Remote", type: "Full-Time", salary: "€35–€60/hour" },
    { title: "Product Designer", location: "Berlin, Germany", type: "Hybrid", salary: "€30–€50/hour" },
    { title: "AI Engineer", location: "Remote", type: "Contract", salary: "€45–€80/hour" },
    { title: "DevOps Engineer", location: "London, UK", type: "Remote", salary: "€40–€70/hour" },
    { title: "Mobile Developer", location: "Toronto, Canada", type: "Hybrid", salary: "€30–€55/hour" },
];

export default function FeaturedJobs() {
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
                        Smart Job Discovery
                    </p>

                    <h2 className="mx-auto max-w-3xl text-4xl font-bold text-white md:text-5xl">
                        The roles you Would never
                        <br />
                        find by searching
                    </h2>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            whileHover={{ y: -8 }}
                            className="group rounded-3xl border border-white/10 bg-[#111111] p-6 transition-all duration-300 hover:border-fuchsia-500/20 hover:shadow-[0_0_35px_rgba(217,70,239,0.12)]"
                        >
                            <h3 className="mb-4 text-3xl font-semibold text-white">
                                {job.title}
                            </h3>

                            <p className="mb-6 text-sm leading-7 text-zinc-500">
                                Showcase your commitment to diversity and inclusion by highlighting initiatives.
                            </p>

                            <div className="mb-8 flex flex-wrap gap-2">
                                <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs text-zinc-300">
                                    <MapPin size={12} />
                                    {job.location}
                                </span>

                                <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs text-zinc-300">
                                    <BriefcaseBusiness size={12} />
                                    {job.type}
                                </span>

                                <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs text-zinc-300">
                                    <Euro size={12} />
                                    {job.salary}
                                </span>
                            </div>

                            <Link
                                href="/jobs"
                                className="inline-flex items-center gap-2 text-sm text-white transition-all duration-300 group-hover:text-fuchsia-300"
                            >
                                Apply Now
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 flex justify-center"
                >
                    <Link
                        href="/jobs"
                        className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                    >
                        View All Open Jobs
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}