"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


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
    const router = useRouter();
    const [company, setCompany] = useState(null);

    const [formData, setFormData] = useState({
        companyName: "",
        industry: "",
        website: "",
        location: "",
        employeeCount: "",
        logoUrl: "",
        description: "",
    });

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
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
            status: "pending",
        };

        console.log(payload);

        Swal.fire({
            icon: "success",
            title: "Company Registered",
            text: "Awaiting admin approval.",
        });

        setCompany(payload);
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

                    <button className="rounded-xl border border-white/10 px-5 py-2 text-sm hover:bg-white/5">
                        Edit Company
                    </button>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#141418] p-6">

                    <div className="flex flex-col gap-6 md:flex-row">

                        <img
                            src={company.logoUrl}
                            alt={company.companyName}
                            className="h-28 w-28 rounded-2xl object-cover border border-white/10"
                        />

                        <div className="space-y-2">

                            <h3 className="text-2xl font-bold">
                                {company.companyName}
                            </h3>

                            <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs text-yellow-400">
                                Pending
                            </span>

                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

            <form onSubmit={handleSubmit}>

                <div className="grid gap-5 p-6 md:grid-cols-2">

                    <InputField
                        label="Company Name"
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
                        value={formData.website}
                        
                        onChange={(e) =>
                            updateField("website", e.target.value)
                        }
                    />

                    <InputField
                        label="Location"
                        value={formData.location}
                        placeholder=""
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

                    <InputField
                        label="Logo URL (ImageBB)"
                        value={formData.logoUrl}
                        onChange={(e) =>
                            updateField("logoUrl", e.target.value)
                        }
                    />

                    <div className="md:col-span-2">
                        <TextAreaField
                            label="Brief Description"
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

            </form>
        </motion.div>
    );

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
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4"
            />
        </div>
    );
}
function TextAreaField({
    label,
    value,
    onChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-sm text-zinc-300">
                {label}
            </label>

            <textarea
                rows={5}
                value={value}
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