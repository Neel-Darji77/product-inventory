import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getSettings } from "../services/settingService";

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
    companyName: "Product Inventory Dashboard",
    lowStockThreshold: 10,
    currency: "INR",
    theme: "light",
    autoLogoutMinutes: 30
};

export function SettingsProvider({ children }) {
    const { token } = useAuth();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [loadingSettings, setLoadingSettings] = useState(false);

    const refreshSettings = useCallback(async () => {
        if (!token) {
            setSettings(DEFAULT_SETTINGS);
            return;
        }
        try {
            setLoadingSettings(true);
            const response = await getSettings();
            if (response && response.data) {
                setSettings(response.data);
            }
        } catch (error) {
            console.error("Failed to load settings:", error.message);
        } finally {
            setLoadingSettings(false);
        }
    }, [token]);

    useEffect(() => {
        refreshSettings();
    }, [refreshSettings]);

    // Apply theme changes to document
    useEffect(() => {
        if (settings?.theme) {
            const root = document.documentElement;
            if (settings.theme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
    }, [settings?.theme]);

    return (
        <SettingsContext.Provider value={{ settings, loadingSettings, refreshSettings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
