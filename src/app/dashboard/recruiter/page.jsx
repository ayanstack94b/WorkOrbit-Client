"use client"

import { useSession } from '@/lib/auth-client';
import React from 'react';
import { BriefcaseBusiness, Users, BadgeCheck, FileStack } from "lucide-react";
import DashboardStats from '@/components/dashboard/DashboardStats';

const RecruiterDashboardHomePage = () => {

    const { data: session, isPending } = useSession()

    if (isPending) {
        return (
            <div className="flex items-center justify-center py-20 text-zinc-400">
                Loading dashboard...
            </div>
        );
    }
    const user = session?.user;
    console.log('session in the dashboard: ', user);

    const recruiterStats = [
        {
            title: "Total Job Posts",
            value: 0,
            icon: FileStack,
        },
        {
            title: "Total Applicants",
            value: 0,
            icon: Users,
        },
        {
            title: "Active Jobs",
            value: 0,
            icon: BriefcaseBusiness,
        },
        {
            title: "Jobs Closed",
            value: 0,
            icon: BadgeCheck,
        },
    ];


    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.name}
            </h1>

            <DashboardStats stats={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;