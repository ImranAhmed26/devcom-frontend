import { FieldError } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  register: any;
};

export default function AuthInput({ label, type = "text", placeholder, error, register }: Props) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full px-4 py-2 bg-gray-50 border ${
          error ? "border-red-400" : "border-gray-200"
        } rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400`}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
