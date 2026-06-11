
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email) && formData.email) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                throw new Error(error.message);
            }

            await Swal.fire({
                icon: "success",
                title: "👋 Welcome Back",
                text: "Login successful",
                background: "#111111",
                color: "#ffffff",
                confirmButtonColor: "#d946ef",
            });

            setFormData({
                email: "",
                password: "",
            });

            router.push("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "😕 Login Failed",
                text: error?.message || "Invalid email or password",
                background: "#111111",
                color: "#ffffff",
                confirmButtonColor: "#d946ef",
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // ============================================
            // Better Auth Google Login Here
            // ============================================

            /*
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
            */
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "😕 Google Login Failed",
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
                        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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

                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 1, 0.2],
                            }}
                            transition={{
                                duration: 4 + (i % 3),
                                repeat: Infinity,
                            }}
                            className="absolute h-1 w-1 rounded-full bg-fuchsia-400"
                            style={{
                                left: `${ (i * 7) % 100 }% `,
                                top: `${ (i * 11) % 100 }% `,
                            }}
                        />
                    ))}

                    <div className="relative z-10 text-center px-10">
                        <h2 className="text-5xl font-bold text-white">
                            Welcome Back
                        </h2>

                        <p className="mt-6 text-zinc-400">
                            Access your dashboard, applications, saved jobs and opportunities.
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
                <div className="relative flex items-center justify-center p-6 md:p-12">

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                        }}
                        className="absolute h-[350px] w-[350px] rounded-full bg-fuchsia-600/20 blur-[120px]"
                    />

                    <motion.form
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-[#111111]/80 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(217,70,239,0.08)]"
                    >
                        <h1 className="mb-2 text-4xl font-bold text-white">
                            Sign In
                        </h1>

                        <p className="mb-8 text-zinc-400">
                            Welcome back to WorkOrbit.
                        </p>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#18181b] py-3 text-white transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-[#1f1f24]"
                        >
                            <svg width="18" height="18" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4C12.9 4 4 12.9 4 24s8.9 20 20 20s20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
                                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4C16.3 4 9.7 8.3 6.3 14.7z"/>
                                <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.4-5.2l-6.2-5.2C29.2 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
                                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.4-6.1 6.8l6.2 5.2C39.1 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
                            </svg>

                            Continue with Google
                        </button>

                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-xs uppercase tracking-wider text-zinc-500">
                                or
                            </span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="space-y-5">

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

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-zinc-400">
                                    <input type="checkbox" className="accent-fuchsia-500" />
                                    Remember me
                                </label>

                                <Link
                                    href="/authentication/forgot-password"
                                    className="text-sm text-fuchsia-400 transition-all hover:text-fuchsia-300"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full rounded-xl bg-fuchsia-600 py-3 font-medium text-white shadow-[0_0_30px_rgba(217,70,239,0.35)] transition-all hover:bg-fuchsia-500"
                            >
                                Sign In
                            </motion.button>

                            <p className="text-center text-zinc-400">
                                Dont have an account?{" "}
                                <Link
                                    href="/authentication/signup"
                                    className="text-fuchsia-400 transition-all hover:text-fuchsia-300"
                                >
                                    Sign Up
                                </Link>
                            </p>

                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

