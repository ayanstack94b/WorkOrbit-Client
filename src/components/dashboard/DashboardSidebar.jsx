

import { Bars, Bell, Envelope, Gear, House, Magnifier, Person, Briefcase } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export default function dashboardSidebar() {
    const navItems = [
        { icon: House, label: "Home", href: "/dashboard/recruiter" },
        { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
        { icon: Bell, label: "Create a Job", href: "/dashboard/recruiter/jobs/new" },
        { icon: Briefcase, label: "Company Profile", href: "/dashboard/recruiter/company" },
        { icon: Envelope, label: "Messages", href: "/dashboard/recruiter" },
        { icon: Person, label: "Company Profile", href: "/dashboard/recruiter/company-profile" },
        { icon: Gear, label: "Settings", href: "/dashboard/recruiter/settings" },
    ];

    const navContent =
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                    href={item.href}
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>
    return (
        <div className="pt-28">

            <aside className="hidden w-64 shrink-0 border-r border-white/10 p-4 lg:block">
                {navContent}
            </aside>

            <Drawer>
                <Button className="fixed left-4 top-22 z-40 lg:hidden" variant="secondary">
                    <Bars />
                </Button>

                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />

                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>

                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </div>
    );
}