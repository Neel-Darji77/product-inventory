import { useState } from "react";
import toast from "react-hot-toast";

import Button from "./ui/Button";
import Input from "./ui/Input";

import { createUser } from "../services/userService";

const initialState = {
    name: "",
    email: "",
    password: "",
    role: "viewer"
};

const CreateUserModal = ({
    isOpen,
    onClose,
    onUserCreated
}) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousState) => ({
            ...previousState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await createUser(formData);
            onUserCreated(response.data);
            toast.success(response.message);
            setFormData(initialState);
            onClose();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-2xl font-semibold">
                    Create User
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Add a manager or viewer account.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >
                    <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600"
                        >
                            <option value="manager">
                                Manager
                            </option>
                            <option value="viewer">
                                Viewer
                            </option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Create User
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;