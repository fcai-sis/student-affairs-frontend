type TextInputFieldProps = {
  placeholder: string,
};

export default function TextInputField({ placeholder }: TextInputFieldProps) {
  return (
    <input
      className="outline-none placeholder:font-normal font-normal placeholder:text-base text-base placeholder:text-slate-500 text-slate-800 p-4 rounded-lg border-slate-400 border bg-slate-50 focus:border-blue-600 focus:border-2"
      placeholder={placeholder}
      type="text" />
  );
}
