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

const Sidebar = () => {
    const navigate = useNavigate();

    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            isActive
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
        }`;

    return (
        <aside className="flex h-screen w-72 flex-col border-r bg-white">
            <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-green-600">
                    Inventory
                </h1>
                <p className="mt-1 text-sm text-gray-500">
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
                <NavLink
                    to="/settings"
                    className={navItemClass}
                >
                    <Settings size={20} />
                    Settings
                </NavLink>
            </nav>
            <div className="border-t p-4">
                <div className="mb-4">
                    <p className="font-semibold text-gray-800">
                        {user?.name}
                    </p>
                    <p className="text-sm capitalize text-gray-500">
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