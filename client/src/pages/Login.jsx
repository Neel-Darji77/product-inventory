import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousState) => ({
            ...previousState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.email.trim()) {
            toast.error("Email is required.");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("Password is required.");
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser(formData);

            login(response.user, response.token);

            toast.success("Login successful.");

            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Product Inventory
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to continue
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;