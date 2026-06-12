"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";

const CompanyNotRegistered = () => {
    const router = useRouter();

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl text-center"
            >
                {/* Illustration */}
                <div className="relative mx-auto mb-10 flex h-64 w-64 items-center justify-center">

                    <div className="absolute h-52 w-52 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm rotate-6" />

                    <div className="absolute h-44 w-44 rounded-3xl bg-white/[0.04] p-5">

                        <div className="mb-4 h-10 w-10 rounded-lg bg-white/10" />

                        <div className="mb-3 h-2 rounded bg-white/10" />

                        <div className="mb-3 h-2 w-4/5 rounded bg-white/10" />

                        <div className="mb-3 h-2 w-3/4 rounded bg-white/10" />

                        <div className="h-2 w-2/3 rounded bg-white/10" />
                    </div>

                    <motion.div
                        animate={{
                            scale: [1, 1.08, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                        className="absolute right-6 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg"
                    >
                        <Building2 size={24} />
                    </motion.div>
                </div>

                {/* Content */}

                <h2 className="text-4xl font-bold text-white">
                    Company not registered yet
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-zinc-400">
                    Set up your business profile to start posting
                    high-performance job listings and manage your
                    talent pool.
                </p>

                {/* Buttons */}

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                    <button
                        onClick={() =>
                            router.push("/dashboard/recruiter/company")
                        }
                        className="rounded-xl bg-white px-8 py-4 font-medium text-black transition-all duration-300 hover:scale-105"
                    >
                        Register your company
                    </button>

                    <button
                        className="rounded-xl border border-white/10 px-8 py-4 text-white transition-all duration-300 hover:bg-white/5"
                    >
                        View FAQ
                    </button>
                </div>

                <p className="mt-16 text-sm text-zinc-500">
                    Need specialized assistance? Contact our
                    enterprise support team.
                </p>
            </motion.div>
        </div>
    );
};

export default CompanyNotRegistered;