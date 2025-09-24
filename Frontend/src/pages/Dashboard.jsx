import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/v1/user/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const balanceRes = await axios.get("/api/v1/account/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(balanceRes.data.balance);

        const userRes = await axios.get("/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);
      } catch (err) {
        console.error(err);
        navigate("/signin", { replace: true }); // redirect if token invalid
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Appbar>
        {user && <span className="mr-4 text-lg">Hello, {user.firstName}</span>}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded"
        >
          Logout
        </button>
      </Appbar>
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {loading ? (
          <div className="text-sm text-zinc-600">Loading...</div>
        ) : (
          <>
            {balance !== null && <Balance value={balance.toLocaleString()} />}
            <Users />
          </>
        )}
      </main>
    </div>
  );
};
