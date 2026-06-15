import { motion } from "framer-motion";

function Button({
  children,
  icon: Icon,
  variant = "primary",
  className = "",
  ...props
}) {

  const variants = {
    primary:
      "bg-green-500 hover:bg-green-600 text-white",
    secondary:
      "border border-gray-200 hover:bg-gray-50 text-gray-800",
    danger:
      "bg-red-500 hover:bg-red-600 text-white",
    outline:
      "border border-green-500 text-green-600 hover:bg-green-50",
  };

  return (
    <motion.button
      whileTap={{
        scale: .96,
      }}
      whileHover={{
        scale: 1.02,
      }}
      className={`
      h-10
      rounded-xl
      px-4
      text-sm
      font-medium
      transition
      flex
      items-center
      justify-center
      gap-2

      ${variants[variant]}
      ${className}
      `}
      {...props}
    >

      {Icon && <Icon size={16} />}
      {children}

    </motion.button>
  );
}

export default Button;