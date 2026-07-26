import "./TicketModal.css";

function TicketModal({ ticket, onClose }) {

    const Field = ({ label, value }) => {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return null;
        }

        return (
            <div className="detail-row">
                <span className="detail-label">{label}</span>
                <span className="detail-value">{value}</span>
            </div>
        );
    };

    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">
                    <h2>🎫 Ticket Details</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Ticket Info */}
                <div className="detail-section">
                    <h3>Ticket Information</h3>

                    <Field label="Ticket ID" value={ticket.id} />
                    <Field label="Status" value={ticket.status} />
                    <Field label="Category" value={ticket.category} />
                    <Field label="Issue" value={ticket.issue} />
                    <Field label="Created At" value={ticket.createdAt} />
                </div>

                {/* User Info */}
                <div className="detail-section">
                    <h3>Customer Information</h3>

                    <Field label="Name" value={ticket.name} />
                    <Field label="Phone" value={ticket.phone} />
                    <Field label="Email" value={ticket.email} />
                    <Field label="Username" value={ticket.username} />
                </div>

                {/* Booking Details */}
                <div className="detail-section">
                    <h3>Booking Details</h3>

                    <Field label="Booking ID" value={ticket.bookingId} />
                    <Field label="Venue" value={ticket.venue} />
                    <Field label="Sport" value={ticket.sport} />
                </div>

                {/* Payment Details */}
                <div className="detail-section">
                    <h3>Payment Details</h3>

                    <Field label="Transaction ID" value={ticket.transactionId} />
                    <Field label="Amount" value={ticket.amount} />
                    <Field label="Payment Method" value={ticket.paymentMethod} />
                </div>

                {/* Equipment Details */}
                <div className="detail-section">
                    <h3>Equipment Details</h3>

                    <Field label="Equipment" value={ticket.equipment} />
                    <Field label="Quantity" value={ticket.quantity} />
                </div>

                {/* Technical Details */}
                <div className="detail-section">
                    <h3>Technical Details</h3>

                    <Field label="Device" value={ticket.device} />
                    <Field label="Browser" value={ticket.browser} />
                </div>

                {/* Description */}
                <div className="detail-section">
                    <h3>Description</h3>

                    <p className="description">
                        {ticket.description}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default TicketModal;