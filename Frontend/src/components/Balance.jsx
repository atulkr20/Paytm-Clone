export const Balance = ({ value }) => {
    return (
        <div className="w-full bg-white border border-zinc-200 rounded-xl p-4 flex items-baseline gap-3">
            <div className="text-sm text-zinc-600">Balance</div>
            <div className="text-2xl font-semibold tracking-tight">₹ {value}</div>
        </div>
    );
}