"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { createCompany, getCompany } from "@/lib/actions/comapny";
import Link from "next/link";



const industries = [
    "Technology",
    "Design",
    "Marketing",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Construction",
    "Manufacturing",
    "Other",
];

const employeeRanges = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
];

export default function CompanyPage() {
    const [company, setCompany] = useState(null);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        website: "",
        location: "",
        employeeCount: "",
        logoUrl: "",
        description: "",
    });
    const router = useRouter()
    useEffect(() => {
        const loadCompany = async () => {
            const companyData = await getCompany("company_123");

            console.log("COMPANY DATA:", companyData);

            if (companyData?.company) {
                setCompany(companyData.company);
            }
        };

        loadCompany();
    }, []);


    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imageFormData = new FormData();

        imageFormData.append("image", file);

        try {
            const res = await fetch(
                "http://localhost:5000/api/upload-logo",
                {
                    method: "POST",
                    body: imageFormData,
                }
            );

            const data = await res.json();

            updateField("logoUrl", data.logoUrl);

            Swal.fire({
                icon: "success",
                title: "Logo Uploaded",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Upload Failed",
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const missing = [];

        if (!formData.companyName) missing.push("Company Name");
        if (!formData.industry) missing.push("Industry");
        if (!formData.website) missing.push("Website");
        if (!formData.location) missing.push("Location");
        if (!formData.employeeCount) missing.push("Employee Count");
        if (!formData.logoUrl) missing.push("Logo URL");
        if (!formData.description) missing.push("Description");

        if (missing.length) {
            return Swal.fire({
                icon: "error",
                title: "Incomplete Form",
                html: missing.join("<br/>"),
            });
        }

        const payload = {
            ...formData,
            companyId: "company_123",
            status: "pending",
        };

        console.log(payload);

        const result = await createCompany(payload);

        console.log(result);

        if (result.insertedId) {
            setCompany(payload);

            Swal.fire({
                icon: "success",
                title: "Company Registered",
                text: "Awaiting admin approval.",
            });
        }
    };

    if (company) {
        return (
            <div className="space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            My Company
                        </h2>

                        <p className="text-zinc-400">
                            Manage your company profile
                        </p>
                    </div>

                    <Link href="/dashboard/recruiter/company/edit">
                        <button className="rounded-xl border border-white/10 px-5 py-2 text-sm hover:bg-white/5">
                            Edit Company
                        </button>
                    </Link>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#141418] p-6">

                    <div className="flex flex-col gap-6 md:flex-row">

                        <Image
                            src={company.logoUrl}
                            alt={company.companyName}
                            width={112}
                            height={112}
                            className="h-28 w-28 rounded-2xl object-cover border border-white/10"
                        />

                        <div className="space-y-2">

                            <h3 className="text-2xl font-bold">
                                {company.companyName}
                            </h3>

                            <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs text-yellow-400">
                                {company.status}
                            </span>

                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">

                        <ReadOnlyField
                            label="Industry"
                            value={company.industry}
                        />

                        <ReadOnlyField
                            label="Website"
                            value={company.website}
                        />

                        <ReadOnlyField
                            label="Location"
                            value={company.location}
                        />

                        <ReadOnlyField
                            label="Employee Count"
                            value={company.employeeCount}
                        />

                    </div>

                    <div className="mt-6">
                        <p className="mb-2 text-sm text-zinc-400">
                            Description
                        </p>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                            {company.description}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    if (showRegistrationForm) {
        return (
            <motion.div
                whileHover={{
                    scale: 1.005,
                    boxShadow: "0 0 50px rgba(217,70,239,0.15)",
                }}
                transition={{
                    duration: 0.3,
                }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#141418]"
            >

                <div className="border-b border-white/10 p-6">
                    <h1 className="text-3xl font-bold">
                        Register New Company
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Enter your business details to start hiring.
                    </p>
                </div>
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{
                        boxShadow: "0 0 40px rgba(217,70,239,0.12)",
                    }}
                >


                    <div className="grid gap-5 p-6 md:grid-cols-2">

                        <InputField
                            label="Company Name"
                            placeholder="Acme Technologies Pvt Ltd"
                            value={formData.companyName}
                            onChange={(e) =>
                                updateField("companyName", e.target.value)
                            }
                        />

                        <SelectField
                            label="Industry"
                            value={formData.industry}
                            options={industries}

                            onChange={(value) =>
                                updateField("industry", value)
                            }
                        />

                        <InputField
                            label="Website URL"
                            placeholder="https://www.acme.com"
                            value={formData.website}
                            onChange={(e) =>
                                updateField("website", e.target.value)
                            }
                        />

                        <InputField
                            label="Location"
                            placeholder="Kolkata, West Bengal, India"
                            value={formData.location}
                            onChange={(e) =>
                                updateField("location", e.target.value)
                            }
                        />

                        <SelectField
                            label="Employee Count"
                            value={formData.employeeCount}
                            options={employeeRanges}
                            onChange={(value) =>
                                updateField("employeeCount", value)
                            }
                        />

                        <div>
                            <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/15 bg-white/5 p-4 transition-all duration-300 hover:border-fuchsia-500/40 hover:bg-fuchsia-500/5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
                                    <ImagePlus size={22} />
                                </div>

                                <div>
                                    <p className="font-medium text-white">
                                        Upload Company Logo
                                    </p>

                                    <p className="text-sm text-zinc-500">
                                        PNG, JPG or WEBP
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                />
                            </label>

                            {formData.logoUrl && (
                                <Image
                                    src={formData.logoUrl}
                                    alt="Company Logo"
                                    width={96}
                                    height={96}
                                    className="rounded-xl border border-white/10 object-cover"
                                />
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <TextAreaField
                                label="Brief Description"
                                placeholder="We are a software company specializing in web development, cloud solutions and digital products."
                                value={formData.description}
                                onChange={(e) =>
                                    updateField("description", e.target.value)
                                }
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-4 border-t border-white/10 p-6">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-xl border border-white/10 px-6 py-3 hover:bg-white/5"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-fuchsia-600 px-6 py-3 font-semibold transition-all hover:bg-fuchsia-500 hover:shadow-[0_0_25px_rgba(217,70,239,0.45)]"
                        >
                            Register Company
                        </button>

                    </div>


                </motion.form>
            </motion.div>
        );
    }


}



function SelectField({
    label,
    value,
    options,
    onChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-sm text-zinc-300">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1f] px-4 text-white"
            >
                <option value="">
                    Select {label}
                </option>

                {options.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}
function InputField({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
}) {
    return (
        <div>
            <label className="mb-2 block text-sm text-zinc-300">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4"
            />
        </div>
    );
}
function TextAreaField({
    label,
    value,
    onChange,
    placeholder = "",
}) {
    return (
        <div>
            <label className="mb-2 block text-sm text-zinc-300">
                {label}
            </label>

            <textarea
                rows={5}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
            />
        </div>
    );
}

function ReadOnlyField({ label, value }) {
    return (
        <div>
            <label className="mb-2 block text-sm text-zinc-300">
                {label}
            </label>

            <input
                readOnly
                value={value}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-zinc-400"
            />
        </div>
    );
}