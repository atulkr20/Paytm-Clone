import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api"; // make sure this points to your api.js

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleTransfer = async () => {
    setLoading(true);
    try {
      await api.post("/account/transfer", { to: id, amount: Number(amount) });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
        {!success ? (
          <>
            <h2 className="text-xl font-semibold tracking-tight">Send money</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <span className="text-sm font-medium">{name ? name[0].toUpperCase() : "?"}</span>
              </div>
              <div className="text-sm text-zinc-700">{name}</div>
            </div>

            <div className="mt-4 space-y-2">
              <label htmlFor="amount" className="text-sm text-zinc-700">Amount (in ₹)</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
              <div className="pt-2">
                <button
                  onClick={handleTransfer}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-black text-white hover:bg-zinc-900 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Send"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              ✓
            </div>
            <h3 className="mt-4 text-lg font-semibold">Transfer successful</h3>
            <p className="mt-1 text-sm text-zinc-600">Your money is on its way to {name}.</p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-black text-white hover:bg-zinc-900"
              >
                Back to dashboard
              </button>
              <button
                onClick={() => { setSuccess(false); setAmount(0); }}
                className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-zinc-200 hover:bg-zinc-50"
              >
                Send again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
