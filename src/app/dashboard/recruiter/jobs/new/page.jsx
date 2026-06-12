"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/jobs";

const company = {
    name: "Disquietude Technologies",
    id: "company_123",
    isApproved: true,
};

const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Sales",
    "Finance",
    "Human Resources",
    "Operations",
    "Customer Support",
];

const jobTypes = [
    "full-time",
    "part-time",
    "contract",
    "internship",
];

const currencies = [
    "USD",
    "EUR",
    "GBP",
    "INR",
    "CAD",
    "AUD",
    "JPY",
    "AED",
    "SGD",
    "BDT",
    "Other",
];

export default function NewJob() {
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobCategory: "",
        jobType: "",
        minSalary: "",
        maxSalary: "",
        currency: "USD",
        customCurrency: "",
        location: "",
        deadline: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
        isRemote: false,
    });
    const router = useRouter();

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            jobTitle: "",
            jobCategory: "",
            jobType: "",
            minSalary: "",
            maxSalary: "",
            currency: "USD",
            customCurrency: "",
            location: "",
            deadline: "",
            responsibilities: "",
            requirements: "",
            benefits: "",
            isRemote: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!company.isApproved) {
            return Swal.fire({
                icon: "warning",
                title: "Company Not Approved",
                text: "Your company must be approved before posting jobs.",
            });
        }

        const missing = [];

        if (!formData.jobTitle) missing.push("Job Title");
        if (!formData.jobCategory) missing.push("Job Category");
        if (!formData.jobType) missing.push("Job Type");
        if (!formData.minSalary) missing.push("Minimum Salary");
        if (!formData.maxSalary) missing.push("Maximum Salary");
        if (!formData.deadline) missing.push("Application Deadline");
        if (!formData.responsibilities)
            missing.push("Responsibilities");
        if (!formData.requirements)
            missing.push("Requirements");

        if (!formData.isRemote && !formData.location) {
            missing.push("Location");
        }

        if (
            formData.currency === "Other" &&
            !formData.customCurrency.trim()
        ) {
            missing.push("Custom Currency");
        }

        if (missing.length) {
            return Swal.fire({
                icon: "error",
                title: "Incomplete Form",
                html: `
          <div class="text-left">
            Missing fields:
            <br/>
            <strong>${missing.join("<br/>")}</strong>
          </div>
        `,
            });
        }

        if (
            Number(formData.maxSalary) <
            Number(formData.minSalary)
        ) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Salary Range",
                text: "Maximum salary must be greater than minimum salary.",
            });
        }

        const payload = {
            jobTitle: formData.jobTitle,
            jobCategory: formData.jobCategory,
            jobType: formData.jobType,

            minSalary: Number(formData.minSalary),
            maxSalary: Number(formData.maxSalary),

            currency:
                formData.currency === "Other"
                    ? formData.customCurrency
                    : formData.currency,

            location: formData.isRemote
                ? "Remote"
                : formData.location,

            deadline: formData.deadline,

            responsibilities: formData.responsibilities,
            requirements: formData.requirements,
            benefits: formData.benefits,

            isRemote: formData.isRemote,

            companyId: company.id,

            status: "active",
            isPubliclyVisible: true,
        };

        try {
            const res = await createJob(payload);

            if (res.insertedId) {
                await Swal.fire({
                    icon: "success",
                    title: "Job Posted Successfully",
                    text: "Your listing is now publicly visible.",
                });

                router.push("/dashboard/recruiter/jobs");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Could not create job.",
            });
        }


    };

    return (
        <div className="relative min-h-screen bg-[#0f0f11] p-6 text-white">
            <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[150px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[150px]" />

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-6xl"
            >
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#141418] shadow-[0_0_40px_rgba(217,70,239,0.08)]">
                    <div className="border-b border-white/10 p-6">
                        <h1 className="text-2xl font-bold">
                            Post New Job
                        </h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            Create a new opportunity for candidates.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Job Info */}
                        <div className="border-b border-white/10 p-6">
                            <h2 className="mb-6 text-lg font-semibold">
                                Job Information
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">
                                <InputField
                                    label="Job Title"
                                    value={formData.jobTitle}
                                    onChange={(e) =>
                                        updateField(
                                            "jobTitle",
                                            e.target.value
                                        )
                                    }
                                />

                                <SelectField
                                    label="Job Category"
                                    value={formData.jobCategory}
                                    options={categories}
                                    onChange={(value) =>
                                        updateField(
                                            "jobCategory",
                                            value
                                        )
                                    }
                                />

                                <SelectField
                                    label="Job Type"
                                    value={formData.jobType}
                                    options={jobTypes}
                                    onChange={(value) =>
                                        updateField("jobType", value)
                                    }
                                />

                                <SelectField
                                    label="Currency"
                                    value={formData.currency}
                                    options={currencies}
                                    onChange={(value) =>
                                        updateField("currency", value)
                                    }
                                />

                                {formData.currency === "Other" && (
                                    <InputField
                                        label="Specify Currency"
                                        value={formData.customCurrency}
                                        onChange={(e) =>
                                            updateField(
                                                "customCurrency",
                                                e.target.value
                                            )
                                        }
                                    />
                                )}

                                <InputField
                                    type="number"
                                    label="Minimum Salary"
                                    value={formData.minSalary}
                                    onChange={(e) =>
                                        updateField(
                                            "minSalary",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputField
                                    type="number"
                                    label="Maximum Salary"
                                    value={formData.maxSalary}
                                    onChange={(e) =>
                                        updateField(
                                            "maxSalary",
                                            e.target.value
                                        )
                                    }
                                />

                                {!formData.isRemote && (
                                    <InputField
                                        label="Location"
                                        value={formData.location}
                                        onChange={(e) =>
                                            updateField(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                    />
                                )}

                                <InputField
                                    type="date"
                                    label="Application Deadline"
                                    value={formData.deadline}
                                    onChange={(e) =>
                                        updateField(
                                            "deadline",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <label className="mt-6 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isRemote}
                                    onChange={(e) =>
                                        updateField(
                                            "isRemote",
                                            e.target.checked
                                        )
                                    }
                                />
                                Remote Position
                            </label>
                        </div>

                        {/* Description */}
                        <div className="border-b border-white/10 p-6">
                            <h2 className="mb-6 text-lg font-semibold">
                                Job Description
                            </h2>

                            <div className="space-y-5">
                                <TextAreaField
                                    label="Responsibilities"
                                    value={formData.responsibilities}
                                    onChange={(e) =>
                                        updateField(
                                            "responsibilities",
                                            e.target.value
                                        )
                                    }
                                />

                                <TextAreaField
                                    label="Requirements"
                                    value={formData.requirements}
                                    onChange={(e) =>
                                        updateField(
                                            "requirements",
                                            e.target.value
                                        )
                                    }
                                />

                                <TextAreaField
                                    label="Benefits (Optional)"
                                    value={formData.benefits}
                                    onChange={(e) =>
                                        updateField(
                                            "benefits",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Company */}
                        <div className="border-b border-white/10 p-6">
                            <h2 className="mb-6 text-lg font-semibold">
                                Company
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">
                                <ReadOnlyField
                                    label="Company Name"
                                    value={company.name}
                                />

                                <ReadOnlyField
                                    label="Company ID"
                                    value={company.id}
                                />

                                <ReadOnlyField
                                    label="Approval Status"
                                    value={
                                        company.isApproved
                                            ? "Approved"
                                            : "Pending"
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 p-6">
                            <button
                                type="button"
                                onClick={() => router.push("/dashboard/recruiter/jobs")}
                                className="rounded-xl border border-white/10 px-6 py-3 text-sm transition hover:bg-white/5"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:bg-fuchsia-500 hover:shadow-[0_0_25px_rgba(217,70,239,0.45)]"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
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
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-none transition-all focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20"
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
                rows={6}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none transition-all focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20"
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
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1f] text-white px-4 outline-none transition-all focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20"
            >
                <option className="bg-[#141418] text-white" value="">
                    Select {label}
                </option>

                {options.map((item) => (
                    <option className="bg-[#141418] text-white"
                        key={item}
                        value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}