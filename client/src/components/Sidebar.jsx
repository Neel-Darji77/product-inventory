import {
    BarChart3,
    LayoutDashboard,
    LogOut,
    Package,
    Settings,
    Users
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

const Sidebar = () => {
    const navigate = useNavigate();

    const { logout, user } = useAuth();
    const { settings } = useSettings();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            isActive
                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }`;

    return (
        <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-gray-200 bg-white dark:bg-slate-900 dark:border-slate-800">
            <div className="border-b border-gray-200 p-6 dark:border-slate-800">
                <h1 className="text-xl font-bold text-green-600 dark:text-green-400 truncate animate-pulse-once" title={settings?.companyName}>
                    {settings?.companyName || "Inventory"}
                </h1>
                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                    Management System
                </p>
            </div>

            <nav className="flex-1 space-y-2 p-4">
                <NavLink
                    to="/"
                    end
                    className={navItemClass}
                >
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>
                <NavLink
                    to="/products"
                    className={navItemClass}
                >
                    <Package size={20} />
                    Products
                </NavLink>
                {user?.role === "admin" && (
                    <NavLink
                        to="/users"
                        className={navItemClass}
                    >
                        <Users size={20} />
                        Users
                    </NavLink>
                )}
                {(user?.role === "admin" ||
                    user?.role === "manager") && (
                    <NavLink
                        to="/analytics"
                        className={navItemClass}
                    >
                        <BarChart3 size={20} />
                        Analytics
                    </NavLink>
                )}
                {user?.role === "admin" && (
                    <NavLink
                        to="/settings"
                        className={navItemClass}
                    >
                        <Settings size={20} />
                        Settings
                    </NavLink>
                )}
            </nav>
            <div className="border-t border-gray-200 p-4 dark:border-slate-800">
                <div className="mb-4">
                    <p className="font-semibold text-gray-800 dark:text-slate-200">
                        {user?.name}
                    </p>
                    <p className="text-sm capitalize text-gray-500 dark:text-slate-400">
                        {user?.role}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;