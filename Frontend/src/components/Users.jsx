import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./Button";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/api/v1/user/bulk?filter=${filter}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const list = (res?.data?.users && Array.isArray(res.data.users))
          ? res.data.users
          : (res?.data?.user && Array.isArray(res.data.user))
            ? res.data.user
            : [];

        setUsers(list);
      } catch (err) {
        console.error(err);
        setError("Failed to load users.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filter, token]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold tracking-tight">Users</h2>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-200"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading && <div className="mt-3 text-sm text-zinc-600">Loading users...</div>}
      {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
      {!loading && !error && users.length === 0 && <div className="mt-3 text-sm text-zinc-600">No users found.</div>}

      <div className="mt-4 space-y-2">
        {users.map(
          (user) =>
            user && (
              <User key={user._id} user={user} navigate={navigate} />
            )
        )}
      </div>
    </div>
  );
};

function User({ user, navigate }) {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-xl p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-medium">
          {user.firstName?.[0]?.toUpperCase() || "?"}
        </div>
        <div className="text-sm text-zinc-700">{user.firstName} {user.lastName}</div>
      </div>

      <Button
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
        label="Send"
        className="px-3"
        fullWidth={false}
      />
    </div>
  );
}
