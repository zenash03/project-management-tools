'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Home, Settings, SquareKanban, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AppSidebar = () => {
    const items = [
        { title: "Dashboard", url: "/", icon: Home },
        { title: "Workspace", url: "/workspace", icon: SquareKanban },
        { title: "Users", url: "/users", icon: User },
        { title: "Settings", url: "/settings", icon: Settings },
    ];

    const workspaceList = [
        { id: "workspace-00001", title: "Workspace 00001" },
        { id: "workspace-00002", title: "Workspace 00002" },
        { id: "workspace-00003", title: "Workspace 00003" },
    ];

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <span className="text-sm text-muted-foreground">Project Management Tools</span>
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>

                            {/* Workspace dropdown */}
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton>
                                            <span>Select Workspace</span>
                                            <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full min-w-[--radix-dropdown-menu-trigger-width] z-50 bg-white border border-muted shadow-md rounded-md p-1">
                                        {workspaceList.map((item) => (
                                            <DropdownMenuItem
                                                key={item.id}
                                                className="cursor-pointer text-sm px-3 py-2 hover:bg-muted rounded w-full"
                                            >
                                                {item.title}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>

                            {/* Navigation links */}
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-primary transition"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;
