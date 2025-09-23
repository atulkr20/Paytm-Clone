export function InputBox({ label, placeholder, value, type = "text", onChange })  {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700">{label}</label>
            <input
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
            />
        </div>
    );
}