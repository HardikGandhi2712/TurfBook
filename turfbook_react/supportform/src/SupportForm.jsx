import React, { useState } from "react";
import "./App.css";
import UserDetails from "./components/UserDetails";
import CategorySelector from "./components/CategorySelector";
import DynamicFields from "./components/DynamicFields";
import IssueDetails from "./components/IssueDetails";
import SupportPanel from "./components/SupportPanel";

function SupportForm() {
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
    const phoneRegex = /^\d{10}$/;
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

    await fetch("http://localhost:3001/insertTickets", {
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
            <UserDetails formData={formData} handleChange={handleChange}/>
            <CategorySelector category={formData.category} handleChange={handleChange}/>
            <DynamicFields category={formData.category} formData={formData} handleChange={handleChange}/>
            <IssueDetails formData={formData} handleChange={handleChange}/>

            <button type="submit">
              Submit Ticket
            </button>

          </form>

        </div>

      <SupportPanel />

      </div>

    </div>
  );
}

export default SupportForm;