import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }, []);

    const initializeAuth = useCallback(async () => {
        try {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            const response = await getCurrentUser();

            setUser(response.user);
            setToken(storedToken);
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: Boolean(token)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }

    return context;
};

export { AuthProvider, useAuth };
