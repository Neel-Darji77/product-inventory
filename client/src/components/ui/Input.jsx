import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    disabled = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password" && showPassword
            ? "text"
            : type;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2 ${
                        error
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:border-green-600 focus:ring-green-100"
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    {...props}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;