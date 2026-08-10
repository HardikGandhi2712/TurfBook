import React, { useEffect, useState } from "react";

function CenterDashboard() {
  const [centers, setCenters] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sportFilter, setSportFilter] = useState("All");
  const [selectedCenter, setSelectedCenter] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "http://localhost:3000/login.html";
    }
  }, []);

  const loadCenters = async () => {
    try {
      const params = new URLSearchParams();
      
      if (search) params.append("search", search);
      if (statusFilter !== "All") params.append("status", statusFilter);
      if (sportFilter !== "All") params.append("sport", sportFilter);

      const response = await fetch(`http://localhost:3001/getCenters?${params.toString()}`);
      const data = await response.json();
      setCenters(data);
    } catch (error) {
      console.error("Error fetching centers:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCenters();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, statusFilter, sportFilter]);

  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Approved" : "Rejected";
    
    await fetch(`http://localhost:3001/updateCenterStatus/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    
    alert(`Status for center ${id} updated to ${newStatus}`);
    loadCenters();
  };

  const deleteCenter = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this center?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:3001/deleteCenter/${id}`, { method: "DELETE" });
    
    alert(`Center ${id} deleted`);
    loadCenters();
  };

  const logout = () => {
    localStorage.removeItem("role");
    window.location.href = "http://localhost:3000/index.html";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-600 to-blue-400 p-4 sm:p-10 font-sans">
      <div className="w-[95%] max-w-[1500px] mx-auto my-[10px] sm:my-[35px]">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center mb-[30px] p-[25px] sm:p-[25px_35px] rounded-[20px] bg-white/12 backdrop-blur-[18px] shadow-[0_15px_35px_rgba(0,0,0,0.25)] gap-5">
          <h1 className="text-white text-3xl font-bold whitespace-nowrap">⚽ Admin Dashboard</h1>

          <div className="flex-1 flex flex-col gap-[15px] lg:mx-[35px]">
            <input
              className="w-full p-[15px_18px] border-none rounded-xl bg-white text-[15px] outline-none shadow-[0_10px_25px_rgba(0,0,0,0.08)] focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="🔍 Search by Center, Owner, Email, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-[15px]">
              <select
                className="flex-1 p-[13px] border-none rounded-xl bg-white text-[15px] cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.08)] outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                className="flex-1 p-[13px] border-none rounded-xl bg-white text-[15px] cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.08)] outline-none focus:ring-2 focus:ring-blue-500"
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
              >
                <option value="All">All Sports</option>
                <option value="Badminton">Badminton</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Tennis">Tennis</option>
              </select>
            </div>
          </div>

          <button
            className="px-[28px] py-[14px] border-none rounded-xl bg-red-500 text-white font-semibold cursor-pointer transition duration-300 hover:bg-red-600 hover:-translate-y-1 shadow-lg"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="bg-white/15 backdrop-blur-[18px] rounded-[22px] p-4 sm:p-[25px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse bg-white rounded-[15px] overflow-hidden">
            <thead className="bg-blue-600">
              <tr>
                <th className="text-white p-[18px] text-[15px] text-center font-semibold">Center Name</th>
                <th className="text-white p-[18px] text-[15px] text-center font-semibold">Owner Info</th>
                <th className="text-white p-[18px] text-[15px] text-center font-semibold">Sports</th>
                <th className="text-white p-[18px] text-[15px] text-center font-semibold">Status</th>
                <th className="text-white p-[18px] text-[15px] text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {centers.map((center) => (
                <tr key={center._id} className="transition duration-250 hover:bg-blue-50 hover:scale-[1.003]">
                  <td className="p-[16px] text-center border-b border-gray-200 text-[14px] text-gray-700 font-semibold">{center.centerName}</td>
                  <td className="p-[16px] text-center border-b border-gray-200 text-[14px] text-gray-700">
                    {center.ownerName}<br />
                    <span className="text-xs text-gray-500">{center.email}</span>
                  </td>
                  <td className="p-[16px] text-center border-b border-gray-200 text-[14px] text-gray-700">
                    {center.sports.join(", ")}
                  </td>
                  <td className="p-[16px] text-center border-b border-gray-200">
                    <span className={`px-[15px] py-[7px] rounded-full text-[13px] font-semibold
                      ${center.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                        center.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'}`}>
                      {center.status}
                    </span>
                  </td>
                  <td className="p-[16px] text-center border-b border-gray-200">
                    <button 
                      onClick={() => setSelectedCenter(center)}
                      className="border-none rounded-[10px] px-4 py-2 text-white text-[13px] cursor-pointer transition duration-250 m-1 bg-blue-500 hover:bg-blue-600 hover:-translate-y-1"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => updateStatus(center._id, center.status)}
                      className="border-none rounded-[10px] px-4 py-2 text-white text-[13px] cursor-pointer transition duration-250 m-1 bg-green-500 hover:bg-green-600 hover:-translate-y-1"
                    >
                      {center.status === "Pending" ? "Approve" : "Change"}
                    </button>
                    <button 
                      onClick={() => deleteCenter(center._id)}
                      className="border-none rounded-[10px] px-4 py-2 text-white text-[13px] cursor-pointer transition duration-250 m-1 bg-red-500 hover:bg-red-600 hover:-translate-y-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {centers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No centers found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCenter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-[20px] p-8 max-w-lg w-full shadow-2xl relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCenter.centerName}</h2>
            <div className="space-y-3 text-[15px] text-gray-700">
              <p><strong>Owner:</strong> {selectedCenter.ownerName}</p>
              <p><strong>Phone:</strong> {selectedCenter.phone}</p>
              <p><strong>Email:</strong> {selectedCenter.email}</p>
              <p><strong>Sports:</strong> {selectedCenter.sports.join(", ")}</p>
              <p><strong>Address:</strong> {selectedCenter.address}</p>
              <p><strong>Status:</strong> {selectedCenter.status}</p>
            </div>
            <button 
              onClick={() => setSelectedCenter(null)}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenterDashboard;