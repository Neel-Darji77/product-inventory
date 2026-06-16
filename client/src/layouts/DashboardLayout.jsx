import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-200">

            <Sidebar />

            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default DashboardLayout;