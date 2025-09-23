import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/v1/account/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch balance");
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Appbar />
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {loading ? (
          <div className="text-sm text-zinc-600">Loading balance...</div>
        ) : (
          balance !== null && <Balance value={balance.toLocaleString()} />
        )}
        <Users />
      </main>
    </div>
  );
};