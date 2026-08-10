import React, { useState } from "react";
import "./App.css";

function CourtRegistrationForm() {
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    centerName: "",
    sports: [],
    address: "",
    additionalDetails: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, sports: [...prev.sports, value] };
      } else {
        return { ...prev, sports: prev.sports.filter((sport) => sport !== value) };
      }
    });
  };

  const validate = () => {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.ownerName || !formData.phone || !formData.email || !formData.centerName || !formData.address) {
      alert("Please fill all required text fields.");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert("Invalid Phone Number. Must be exactly 10 digits.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Invalid Email Address.");
      return false;
    }

    if (formData.sports.length === 0) {
      alert("Please select at least one sport.");
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Simulate API call
    console.log("Submitting to MongoDB:", formData);
    alert("Center Registered Successfully!");

    // Reset state
    setFormData({
      ownerName: "",
      phone: "",
      email: "",
      centerName: "",
      sports: [],
      address: "",
      additionalDetails: "",
    });
  };

  const inputStyles = `w-full p-4 mb-5 rounded-xl border-2 border-gray-300 text-[15px] 
    outline-none transition duration-300 bg-gray-50 placeholder-gray-400
    focus:border-blue-600 focus:bg-white focus:shadow-[0_0_12px_rgba(37,99,235,0.2)]`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-600 to-blue-400 flex justify-center items-center p-4 sm:p-10 font-sans">
      
      <div className="w-full max-w-[1100px] min-h-[700px] flex flex-col lg:flex-row bg-white/10 backdrop-blur-md rounded-[25px] overflow-hidden shadow-2xl">
        
        {/* Left Side (Form) */}
        <div className="flex-[1.3] bg-white p-8 sm:p-12 overflow-y-auto flex flex-col justify-center">
          <h1 className="text-blue-700 text-3xl sm:text-4xl font-semibold mb-3">
            Register Your Center
          </h1>
          <p className="text-gray-600 mb-8">
            Partner with TurfBook and get your courts online today.
          </p>

          <form onSubmit={submitForm} className="flex flex-col">
            
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Full Name *"
              value={formData.ownerName}
              onChange={handleChange}
              className={inputStyles}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              className={inputStyles}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className={inputStyles}
            />

            <input
              type="text"
              name="centerName"
              placeholder="Center Name *"
              value={formData.centerName}
              onChange={handleChange}
              className={inputStyles}
            />

            {/* Checkbox Group */}
            <p className="text-base font-semibold text-gray-800 mb-4">Available Sports *</p>
            <div className="flex items-center gap-6 flex-wrap mb-6">
              {["Badminton", "Football", "Cricket", "Tennis"].map((sport) => (
                <label key={sport} className="flex items-center gap-2 cursor-pointer m-0">
                  <input
                    type="checkbox"
                    value={sport}
                    checked={formData.sports.includes(sport)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 m-0 p-0 accent-blue-600 cursor-pointer rounded"
                  />
                  <span className="text-[15px] text-gray-700 leading-none pb-[1px]">{sport}</span>
                </label>
              ))}
            </div>

            <textarea
              name="address"
              placeholder="Complete Center Address *"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className={`${inputStyles} resize-none`}
            />

            <textarea
              name="additionalDetails"
              placeholder="Additional Details (Amenities, Timings, Parking, etc.)"
              rows="3"
              value={formData.additionalDetails}
              onChange={handleChange}
              className={`${inputStyles} resize-none`}
            />

            <button
              type="submit"
              className="mt-2 p-4 rounded-xl bg-blue-600 text-white text-lg font-semibold cursor-pointer transition duration-300 hover:bg-blue-800 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] active:scale-98"
            >
              Submit Registration
            </button>
          </form>
        </div>

        {/* Right Side (Branding/Info) */}
        <div className="flex-1 text-white flex flex-col justify-center items-center p-10 sm:p-12 text-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 order-first lg:order-last">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
            Join the Network
          </h2>
          <p className="leading-relaxed text-base sm:text-lg opacity-95">
            Maximize your facility's occupancy. Manage bookings, track revenue, and reach local players looking for their next game.
          </p>
          
          <img 
            src="https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=500" 
            alt="Sports Center" 
            className="w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] object-cover mt-10 rounded-full filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] border-4 border-white/20"
          />
        </div>

      </div>
    </div>
  );
}

export default CourtRegistrationForm;