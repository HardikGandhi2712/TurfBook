import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    bookingId: "",
    venue: "",
    sport: "",
    transactionId: "",
    amount: "",
    paymentMethod: "",
    equipment: "",
    quantity: "",
    device: "",
    browser: "",
    username: "",
    issue: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.category
    ) {
      alert("Please fill all required fields.");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert("Invalid Phone Number");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Invalid Email Address");
      return false;
    }

    if (!formData.description) {
      alert("Please enter description.");
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await fetch("http://localhost:3001/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    alert("Support Ticket Submitted Successfully!");

    setFormData({
      name: "",
      phone: "",
      email: "",
      category: "",
      bookingId: "",
      venue: "",
      sport: "",
      transactionId: "",
      amount: "",
      paymentMethod: "",
      equipment: "",
      quantity: "",
      device: "",
      browser: "",
      username: "",
      issue: "",
      description: ""
    });
  };

  return (
    <div className="container">

      <div className="card">

        <div className="left">

          <h1>PlayOn Support Center</h1>

          <p>
            Tell us your issue and we'll help you as soon as possible.
          </p>

          <form onSubmit={submitForm}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              maxLength="10"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Issue Category</option>

              <option value="Booking Issue">
                Booking Issue
              </option>

              <option value="Payment Issue">
                Payment Issue
              </option>

              <option value="Refund Request">
                Refund Request
              </option>

              <option value="Venue Complaint">
                Venue Complaint
              </option>

              <option value="Equipment Rental">
                Equipment Rental
              </option>

              <option value="Technical Issue">
                Technical Issue
              </option>

              <option value="Account Issue">
                Account Issue
              </option>

            </select>

            {/* BOOKING */}

            {formData.category === "Booking Issue" && (
              <>
                <input
                  type="text"
                  name="bookingId"
                  placeholder="Booking ID"
                  value={formData.bookingId}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="venue"
                  placeholder="Venue Name"
                  value={formData.venue}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="sport"
                  placeholder="Sport"
                  value={formData.sport}
                  onChange={handleChange}
                />
              </>
            )}

            {/* PAYMENT */}

            {formData.category === "Payment Issue" && (
              <>
                <input
                  type="text"
                  name="transactionId"
                  placeholder="Transaction ID"
                  value={formData.transactionId}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount Paid"
                  value={formData.amount}
                  onChange={handleChange}
                />

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">Payment Method</option>

                  <option>UPI</option>

                  <option>Credit Card</option>

                  <option>Debit Card</option>

                  <option>Net Banking</option>

                </select>
              </>
            )}

            {/* REFUND */}

            {formData.category === "Refund Request" && (
              <>
                <input
                  type="text"
                  name="bookingId"
                  placeholder="Booking ID"
                  value={formData.bookingId}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Refund Amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </>
            )}

            {/* VENUE */}

            {formData.category === "Venue Complaint" && (
              <>
                <input
                  type="text"
                  name="venue"
                  placeholder="Venue Name"
                  value={formData.venue}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="sport"
                  placeholder="Sport"
                  value={formData.sport}
                  onChange={handleChange}
                />
              </>
            )}

            {/* EQUIPMENT */}

            {formData.category === "Equipment Rental" && (
              <>
                <input
                  type="text"
                  name="equipment"
                  placeholder="Equipment Name"
                  value={formData.equipment}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </>
            )}

            {/* TECHNICAL */}

            {formData.category === "Technical Issue" && (
              <>
                <input
                  type="text"
                  name="device"
                  placeholder="Device"
                  value={formData.device}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="browser"
                  placeholder="Browser"
                  value={formData.browser}
                  onChange={handleChange}
                />
              </>
            )}

            {/* ACCOUNT */}

            {formData.category === "Account Issue" && (
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </>
            )}

            <input
              type="text"
              name="issue"
              placeholder="Issue Title"
              value={formData.issue}
              onChange={handleChange}
            />

            <textarea
              rows="5"
              name="description"
              placeholder="Describe your issue..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <button type="submit">
              Submit Ticket
            </button>

          </form>

        </div>

        <div className="right">

          <h2>Need Assistance?</h2>

          <p>
            Our support team is here to help with booking, payment,
            technical issues, refunds, equipment rentals and more.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
            alt="Support"
          />

        </div>

      </div>

    </div>
  );
}

export default App;