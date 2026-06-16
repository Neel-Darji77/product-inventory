import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import CreateUserModal from "../components/CreateUserModel.jsx";

import {
    deleteUser,
    getUsers,
    toggleUserStatus,
    updateUserRole
} from "../services/userService";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserCreated = (user) => {
        setUsers((previousUsers) => [
            user,
            ...previousUsers
        ]);
    };

    const handleDelete = async (userId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (!confirmed) {
            return;
        }
        try {
            await deleteUser(userId);
            setUsers((previousUsers) =>
                previousUsers.filter(
                    (user) => user._id !== userId
                )
            );
            toast.success("User deleted successfully.");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleRoleChange = async (
        userId,
        role
    ) => {
        try {
            const response = await updateUserRole(
                userId,
                role
            );
            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user._id === userId
                        ? {
                            ...user,
                            role
                        }
                        : user
                )
            );
            toast.success(response.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleToggleStatus = async (userId) => {
        try {
            const response = await toggleUserStatus(
                userId
            );
            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user._id === userId
                        ? {
                            ...user,
                            isActive: !user.isActive
                        }
                        : user
                )
            );
            toast.success(response.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                user.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                user.email
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
    }, [users, search]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-lg text-gray-500">
                    Loading users...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUserCreated={handleUserCreated}
            />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
                        User Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-slate-400">
                        Manage administrators, managers and viewers
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
                >
                    + Add User
                </button>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 py-3 outline-none transition focus:border-green-600 md:max-w-sm"
                    />
                    <div className="text-sm text-gray-500 dark:text-slate-400">
                        Total Users
                        <span className="ml-2 rounded-lg bg-green-100 dark:bg-green-950/40 px-3 py-1 font-semibold text-green-700 dark:text-green-400">
                            {filteredUsers.length}
                        </span>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Role
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="py-16 text-center text-gray-500"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                        {filteredUsers.map((user) => (
                            <tr
                                key={user._id}
                                className="border-t border-gray-200 dark:border-slate-800 transition hover:bg-gray-50 dark:hover:bg-slate-800/40"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40 font-semibold text-green-700 dark:text-green-400">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-slate-100">
                                                {user.name}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-slate-400">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={user.role}
                                        onChange={(event) =>
                                            handleRoleChange(
                                                user._id,
                                                event.target.value
                                            )
                                        }
                                        className="rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-3 py-2 text-sm outline-none transition focus:border-green-600 dark:focus:border-green-500"
                                    >
                                        <option value="admin">
                                            Admin
                                        </option>
                                        <option value="manager">
                                            Manager
                                        </option>
                                        <option value="viewer">
                                            Viewer
                                        </option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() =>
                                            handleToggleStatus(user._id)
                                        }
                                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${user.isActive
                                                ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950/40 dark:text-green-400"
                                                : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400"
                                            }`}
                                    >
                                        {user.isActive
                                            ? "Active"
                                            : "Inactive"}

                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() =>
                                                handleDelete(user._id)
                                            }
                                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
