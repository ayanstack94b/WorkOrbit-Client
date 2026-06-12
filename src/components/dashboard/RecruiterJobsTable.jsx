"use client";

import { motion } from "framer-motion";
import { Chip, Table, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin, } from "@gravity-ui/icons";


export default function RecruiterJobsTable({ jobs =[] }) {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h2 className="text-3xl font-bold text-white">
                        Manage Jobs
                    </h2>

                    <p className="mt-2 text-sm text-zinc-400">
                        View, edit and manage all company job postings.
                    </p>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/5 px-4 py-2 min-w-[160px]">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                        Total Jobs
                    </p>

                    <motion.p
                        animate={{
                            textShadow: [
                                "0 0 4px rgba(217,70,239,0.2)",
                                "0 0 16px rgba(217,70,239,0.8)",
                                "0 0 4px rgba(217,70,239,0.2)",
                            ],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        whileHover={{
                            scale: 1.15,
                        }}
                        className="cursor-default text-xl font-bold text-fuchsia-400"
                    >
                        {jobs.length}
                    </motion.p>

                    
                </div>
            </motion.div>
            {/* Table Card with motion*/}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{
                    boxShadow:
                        "0 0 40px rgba(217,70,239,0.12)",
                }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#141418]"
            >

                <div className="">
                    <Table>
                        <Table.ResizableContainer>
                            <Table.Content
                                aria-label="Company Jobs Table"
                                className="min-w-225"
                            >
                                <Table.Header>
                                    <Table.Column
                                        isRowHeader
                                        id="jobTitle"
                                        defaultWidth="2fr"
                                    >
                                        Job Title
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        id="jobType"
                                        defaultWidth="1fr"
                                    >
                                        Job Type
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        id="deadline"
                                        defaultWidth="1fr"
                                    >
                                        Deadline
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        id="status"
                                        defaultWidth="1fr"
                                    >
                                        Status
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        id="actions"
                                        defaultWidth="1fr"
                                    >
                                        Actions
                                    </Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {jobs.map((job) => (
                                        <Table.Row key={job._id}>
                                            <Table.Cell>
                                                <div>
                                                    <p className="font-medium">
                                                        {job.jobTitle}
                                                    </p>

                                                    <p className="text-xs text-zinc-500">
                                                        {job.jobCategory}
                                                    </p>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span className="capitalize">
                                                    {job.jobType}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {job.deadline}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip
                                                    color={
                                                        job.status === "active"
                                                            ? "success"
                                                            : "danger"
                                                    }
                                                    size="sm"
                                                    variant="soft"
                                                >
                                                    {job.status}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="flex items-center gap-2">

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        className="transition-all duration-300 hover:bg-fuchsia-500/10 hover:text-fuchsia-400"
                                                    >
                                                        <Eye />
                                                    </Button>

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        className="transition-all duration-300 hover:bg-blue-500/10 hover:text-blue-400"
                                                    >
                                                        <Pencil />
                                                    </Button>

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        className="text-red-500 transition-all duration-300 hover:scale-110 hover:text-red-400"
                                                    >
                                                        <TrashBin />
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ResizableContainer>
                    </Table>
                </div>
            </motion.div>
        </div>
    );
}