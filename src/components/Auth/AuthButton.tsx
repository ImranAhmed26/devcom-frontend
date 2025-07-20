import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  isLoading?: boolean;
  delay?: number;
  variant?: "primary" | "secondary";
};

export default function AuthButton({
  children,
  type = "button",
  onClick,
  isLoading = false,
  delay = 0,
  variant = "primary",
}: Props) {
  const baseStyles = "w-full font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center";
  const variants = {
    primary: "bg-gray-800 hover:bg-gray-900 text-white disabled:opacity-70",
    secondary: "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}
