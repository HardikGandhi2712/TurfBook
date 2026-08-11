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
    const [showFileSystem, setShowFileSystem] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (!role) return;

        if (role !== "admin") {
            window.location.href = "http://localhost:3000/login.html";
        }
    }, []);


    const renameCSV = async () => {
    const newName = prompt("Enter the new CSV file name:");

    if (!newName) return;

    try {
        const response = await fetch(
            `http://localhost:3001/rename-csv?name=${encodeURIComponent(newName)}`
        );

        const data = await response.json();

        alert(data.message);
    } catch (error) {
        alert("Error renaming CSV file");
        console.error(error);
    }
};

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

        await fetch(`http://localhost:3001/update-csv/${id}`, {
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

    const exportTickets = async () => {
        const response = await fetch("http://localhost:3001/export");
        const data = await response.text();
        alert(data);
    };

    const importTickets = async () => {
        const response = await fetch("http://localhost:3001/import");
        const data = await response.text();
        alert(data);
    }

const deleteCSV = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete the CSV backup?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
        "http://localhost:3001/delete-csv",
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);
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
                <div className="filesystem-wrapper">

                    <button
                        className="filesystem-btn"
                        onClick={() => setShowFileSystem(!showFileSystem)}
                    >
                        📁 File System
                        <span className="arrow">
                            {showFileSystem ? "▲" : "▼"}
                        </span>
                    </button>

                    {showFileSystem && (
                        <div className="filesystem-mega-menu">

                            <div className="filesystem-column">
                                <h3>File System</h3>

                                <div
                                    className="filesystem-item"
                                    onClick={importTickets}
                                >
                                    <strong>Import</strong>
                                    <span>Import tickets from a CSV file</span>
                                </div>

                                <div
                                    className="filesystem-item"
                                    onClick={exportTickets}
                                >
                                    <strong>Export</strong>
                                    <span>Export tickets to a CSV file</span>
                                </div>
                            </div>

                            <div className="filesystem-column">
                                <h3>Manage Files</h3>
                                <div
                                    className="filesystem-item"
                                    onClick={renameCSV}
                                >
                                    <strong>Rename</strong>
                                    <span>Rename the CSV file</span>
                                </div>

                                <div
                                    className="filesystem-item delete-item"
                                    onClick={deleteCSV}
                                >
                                    <strong>Delete</strong>
                                    <span>Delete the CSV file</span>
                                </div>
                            </div>

                        </div>
                    )}

                </div>

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
