import { useEffect, useState } from "react";
import TicketTable from "./components/TicketTable";
import "./AdminDashboard.css";
import TicketModal from "./components/TicketModal";

function AdminDashboard() {
    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (!role) return;

        if (role !== "admin") {
            window.location.href = "http://localhost:3000/login.html";
        }
    }, []);


    const loadTickets = () => {
        fetch("http://localhost:3001/readTickets")
            .then(res => res.json())
            .then(data => setTickets(data));
    };

    useEffect(() => {
        loadTickets();
    }, []);

const viewTicket = (ticket) => {
    setSelectedTicket(ticket);
};

    const filteredTickets = tickets.filter((ticket) => {

        const searchMatch =
            search === "" ||
            ticket.id.toString().includes(search) ||
            ticket.name.toLowerCase().includes(search.toLowerCase()) ||
            ticket.email.toLowerCase().includes(search.toLowerCase()) ||
            ticket.phone.includes(search) ||
            (ticket.bookingId || "").toLowerCase().includes(search.toLowerCase()) ||
            (ticket.issue || "").toLowerCase().includes(search.toLowerCase());

        const statusMatch =
            statusFilter === "All" ||
            ticket.status === statusFilter;

        const categoryMatch =
            categoryFilter === "All" ||
            ticket.category === categoryFilter;

        return (
            searchMatch &&
            statusMatch &&
            categoryMatch
        );
    });

    const resolveTicket = async (id, currentStatus) => {

        const newStatus =
            currentStatus === "Resolved"
                ? "Unresolved"
                : "Resolved";

        await fetch(`http://localhost:3001/tickets/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: newStatus
            })
        });

        loadTickets();
    };

    const deleteTicket = async (id) => {

        await fetch(`http://localhost:3001/tickets/${id}`, {
            method: "DELETE"
        });

        loadTickets();
    };

    const logout = () => {
        localStorage.removeItem("role");
        window.location.href = "http://localhost:3000/index.html";
    };


    return (
        <div className="admin-container">

            <div className="admin-header">
                <h1>🎫 Admin Dashboard</h1>

                <div className="toolbar">

                    <input
                        className="search-box"
                        type="text"
                        placeholder="🔍 Search by ID, Name, Email, Phone, Booking ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="filters">

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Unresolved">Unresolved</option>
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Booking Issue">Booking Issue</option>
                            <option value="Payment and Refund Issue">Payment and Refund Issue</option>
                            <option value="Equipment and Venue Issue">Equipment and Venue Issue</option>
                            <option value="Technical/ Account">Technical/ Account</option>
                        </select>
                    </div>

                </div>
                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

            <div className="table-card">
                <TicketTable
                    tickets={filteredTickets}
                    resolveTicket={resolveTicket}
                    deleteTicket={deleteTicket}
                    viewTicket={setSelectedTicket}
                />
            </div>
            {selectedTicket && (
            <TicketModal
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
            />
)}
        </div>
    );
}

export default AdminDashboard;