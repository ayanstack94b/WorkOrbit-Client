"use client";

import { getCompany, updateCompany } from "@/lib/actions/comapny";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



export default function EditCompanyPage() {

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

    const router = useRouter()

    const companyId = "company_123";


    useEffect(() => {
        const loadCompany = async () => {

            const data = await getCompany(companyId);
            console.log(data);

            if (data?.company) {
                setCompany(data.company);
            }

        };

        loadCompany();
    }, []);


    useEffect(() => {
        if (company) {
            setFormData({
                companyName: company.companyName || "",
                industry: company.industry || "",
                website: company.website || "",
                location: company.location || "",
                employeeCount: company.employeeCount || "",
                logoUrl: company.logoUrl || "",
                description: company.description || "",
            });
            // <pre>{JSON.stringify(formData, null, 2)}</pre>
        }
    }, [company]);

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

        try {
            const result = await updateCompany(
                companyId,
                formData
            );

            console.log("UPDATE RESULT:", result);

            if (result.success) {
                Swal.fire({
                    icon: "success",
                    title: "Company Updated",
                    text: "Changes saved successfully.",
                });
                router.push("/dashboard/recruiter/company");
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Update Failed",
            });
        }
    };

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

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
                    Edit Company
                </h1>

                <p className="mt-2 text-zinc-400">
                    Update your company information.
                </p>
            </div>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
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
                                    Change Company Logo
                                </p>

                                <p className="text-sm text-zinc-500">
                                    PNG, JPG or WEBP
                                </p>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                            />
                        </label>

                        {formData.logoUrl && (
                            <div className="mt-4">
                                <Image
                                    src={formData.logoUrl}
                                    alt="Company Logo"
                                    width={96}
                                    height={96}
                                    className="rounded-xl border border-white/10 object-cover"
                                />
                            </div>
                        )}
                    </div>

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
                        Save Changes
                    </button>

                </div>
            </motion.form>
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

