import { LoaderCircle } from "lucide-react";

const Button = ({
    children,
    type = "button",
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={loading || disabled}
            className={`
                flex items-center justify-center gap-2
                rounded-xl
                bg-green-600
                px-4
                py-2.5
                font-medium
                text-white
                transition-all
                duration-200
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${className}
            `}
            {...props}
        >
            {loading && (
                <LoaderCircle
                    size={18}
                    className="animate-spin"
                />
            )}

            {children}
        </button>
    );
};

export default Button;