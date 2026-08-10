import TicketRow from "./TicketRow";

function TicketTable({ tickets, resolveTicket, deleteTicket, viewTicket }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map(ticket => (
                    <TicketRow
                        key={ticket.id}
                        ticket={ticket}
                        resolveTicket={resolveTicket}
                        deleteTicket={deleteTicket}
                        viewTicket={viewTicket}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default TicketTable;