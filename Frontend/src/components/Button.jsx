export function Button({ label, onClick, variant = "primary", className = "", fullWidth = true }) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-10 px-4 py-2";
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-900 focus:ring-zinc-400",
    secondary: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 focus:ring-zinc-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };
  const width = fullWidth ? "w-full" : "";
  const styles = `${base} ${variants[variant]} ${width} ${className}`.trim();
  return (
    <button
      onClick={onClick}
      type="button"
      className={styles}
    >
      {label}
    </button>
  );
}
