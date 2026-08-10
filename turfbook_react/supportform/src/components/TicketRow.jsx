import ButtonComponent from "./buttonComponent";

function TicketRow({ ticket, resolveTicket, deleteTicket, viewTicket }) {
    return (
        <tr>
            <td>{ticket.id}</td>
            <td>{ticket.name}</td>
            <td>{ticket.category}</td>
            <td>{ticket.issue}</td>
            <td>
                <span
                    className={
                        ticket.status === "Resolved"
                        ? "status resolved"
                        : "status unresolved"
                    }
                >
                    {ticket.status}
                </span>
            </td>
            <td>{ticket.createdAt}</td>
            <td>
                <ButtonComponent style={ticket.status === "Resolved" ? "unresolve-btn" : "resolve-btn"} btnText={ticket.status === "Resolved" ? "Mark Unresolved" : "Resolve"}
                    onClickCallback={() => resolveTicket(ticket.id, ticket.status)}
                />
                <ButtonComponent style="delete-btn" btnText = "Delete" onClickCallback = {() => deleteTicket(ticket.id)} />
                <ButtonComponent style="view-btn" btnText="View" onClickCallback={() => viewTicket(ticket)}/>        
            </td>
        </tr>
    );
}

export default TicketRow;