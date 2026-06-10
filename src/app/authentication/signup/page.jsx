
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {

            await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
            });

            await Swal.fire({
                icon: "success",
                title: "🎉 Account Created",
                text: "Please login to continue",
                background: "#111111",
                color: "#ffffff",
                confirmButtonColor: "#d946ef",
            });

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            router.push("/auth/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "😕 Signup Failed",
                text: error?.message || "Something went wrong",
                background: "#111111",
                color: "#ffffff",
                confirmButtonColor: "#d946ef",
            });
        }
    };

    return (
        <section className="w-11/12 mx-auto my-24">
            <div className="grid min-h-[800px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f] lg:grid-cols-2">

                {/* Left Side */}
                <div className="relative hidden overflow-hidden lg:flex items-center justify-center">
                    <motion.div
                        animate={{
                            backgroundPosition: ["0px 0px", "60px 60px"],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
linear - gradient(rgba(217, 70, 239, .3) 1px, transparent 1px),
    linear - gradient(90deg, rgba(217, 70, 239, .3) 1px, transparent 1px)
        `,
                            backgroundSize: "40px 40px",
                        }}
                    />

                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                        }}
                        className="absolute h-[450px] w-[450px] rounded-full bg-fuchsia-600/20 blur-[120px]"
                    />

                    <div className="relative z-10 text-center px-10">
                        <h2 className="text-5xl font-bold text-white">
                            Join WorkOrbit
                        </h2>

                        <p className="mt-6 text-zinc-400">
                            Discover opportunities, connect with companies and build your future.
                        </p>

                        <div className="mt-10 grid grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-3xl font-bold text-fuchsia-400">
                                    50K+
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    Jobs
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-fuchsia-400">
                                    12K+
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    Companies
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-bold text-fuchsia-400">
                                    2M+
                                </h3>
                                <p className="text-sm text-zinc-500">
                                    Seekers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-6 md:p-12">
                    <motion.form
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111]/80 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(217,70,239,0.08)]"
                    >
                        <h1 className="mb-2 text-4xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="mb-8 text-zinc-400">
                            Start your journey with WorkOrbit.
                        </p>

                        <div className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition-all focus:border-fuchsia-500"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition-all focus:border-fuchsia-500"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition-all focus:border-fuchsia-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-zinc-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>

                                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                            </div>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-white outline-none transition-all focus:border-fuchsia-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-4 text-zinc-400"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>

                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full rounded-xl bg-fuchsia-600 py-3 font-medium text-white shadow-[0_0_30px_rgba(217,70,239,0.35)] transition-all hover:bg-fuchsia-500"
                            >
                                Create Account
                            </motion.button>

                            <p className="text-center text-zinc-400">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    className="text-fuchsia-400 hover:text-fuchsia-300"
                                >
                                    Sign In
                                </Link>
                            </p>
                            {/* google btn */}
                            <button
                                type="button"
                                className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#18181b] py-3 text-white transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-[#1f1f24]"
                            >
                                <svg width="18" height="18" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
                                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4C16.3 4 9.7 8.3 6.3 14.7z" />
                                    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.4-5.2l-6.2-5.2C29.2 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.2 44 24 44z" />
                                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.4-6.1 6.8l6.2 5.2C39.1 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z" />
                                </svg>

                                Continue with Google
                            </button>

                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

