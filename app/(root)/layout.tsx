import React, { Suspense } from 'react';
import AppSidebar from '../components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const Layout = ({
    children,
}: {children: React.ReactNode}) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex h-screen">
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                </SidebarProvider>
            </div>
        </Suspense>
    );
}

export default Layout;
