export const Appbar = () => {
    return (
        <header className="h-14 border-b border-zinc-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
            <div className="mx-auto max-w-5xl h-full px-4 flex items-center justify-between">
                <div className="font-semibold tracking-tight">Paytm</div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-600">Hello</span>
                    <div className="rounded-full h-9 w-9 bg-zinc-200 flex items-center justify-center text-sm font-medium">U</div>
                </div>
            </div>
        </header>
    );
}