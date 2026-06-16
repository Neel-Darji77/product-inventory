import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { updateSettings } from "../services/settingService";
import { useSettings } from "../context/SettingsContext";

const Settings = () => {
    const { settings: globalSettings, refreshSettings, loadingSettings } = useSettings();
    const [settings, setSettings] = useState({
        companyName: "",
        lowStockThreshold: 10,
        currency: "INR",
        theme: "light",
        autoLogoutMinutes: 30
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (globalSettings) {
            setSettings(globalSettings);
        }
    }, [globalSettings]);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;
        const parsedValue = (name === "lowStockThreshold" || name === "autoLogoutMinutes")
            ? Number(value)
            : value;

        setSettings((previousState) => ({
            ...previousState,
            [name]: parsedValue
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setSaving(true);
            const response = await updateSettings(
                settings
            );
            await refreshSettings();
            toast.success(response.message || "Settings updated successfully.");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loadingSettings) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-lg text-gray-500">
                    Loading settings...
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Settings
                </h1>
                <p className="mt-2 text-gray-500">
                    Manage your application preferences.
                </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={settings.companyName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
                    />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Low Stock Threshold
                        </label>
                        <input
                            type="number"
                            name="lowStockThreshold"
                            value={settings.lowStockThreshold}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
                        />
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Auto Logout (Minutes)
                        </label>
                        <input
                            type="number"
                            name="autoLogoutMinutes"
                            value={settings.autoLogoutMinutes}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
                        />
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Currency
                        </label>
                        <select
                            name="currency"
                            value={settings.currency}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
                        >
                            <option value="INR">
                                INR (₹)
                            </option>
                            <option value="USD">
                                USD ($)
                            </option>
                            <option value="EUR">
                                EUR (€)
                            </option>
                        </select>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Theme
                        </label>
                        <select
                            name="theme"
                            value={settings.theme}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
                        >
                            <option value="light">
                                Light
                            </option>
                            <option value="dark">
                                Dark
                            </option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;