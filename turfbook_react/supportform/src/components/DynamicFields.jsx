function DynamicFields({ category, formData, handleChange }) {
  return (
    <>
      {category === "Booking Issue" && (
        <>
          <input type="text" name="bookingId" placeholder="Booking ID" value={formData.bookingId} onChange={handleChange} />
          <input type="text" name="venue" placeholder="Venue Name" value={formData.venue} onChange={handleChange} />
          <div className="sport-section">
          <label className="field-title">
              Choose Sport
          </label>
          <br />
          <br />

          <div className="radio-group">

              <label className="radio-option">
                  <input
                      type="radio"
                      name="sport"
                      value="Football"
                      checked={formData.sport === "Football"}
                      onChange={handleChange}
                  />
                  <span>Football</span>
              </label>

              <label className="radio-option">
                  <input
                      type="radio"
                      name="sport"
                      value="Cricket"
                      checked={formData.sport === "Cricket"}
                      onChange={handleChange}
                  />
                  <span>Cricket</span>
              </label>

              <label className="radio-option">
                  <input
                      type="radio"
                      name="sport"
                      value="Badminton"
                      checked={formData.sport === "Badminton"}
                      onChange={handleChange}
                  />
                  <span>Badminton</span>
              </label>

              <label className="radio-option">
                  <input
                      type="radio"
                      name="sport"
                      value="Tennis"
                      checked={formData.sport === "Tennis"}
                      onChange={handleChange}
                  />
                  <span>Tennis</span>
              </label>

          </div>

      </div>
        </>
      )}

      {category === "Payment and Refund Issue" && (
        <>
          <input type="text" name="bookingId" placeholder="Booking ID" value={formData.bookingId} onChange={handleChange} />
          <input type="text" name="transactionId" placeholder="Transaction ID" value={formData.transactionId} onChange={handleChange} />
          <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="">Payment Method</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </>
      )}

      {category === "Equipment and Venue Issue" && (
        <>
          <input type="text" name="venue" placeholder="Venue Name" value={formData.venue} onChange={handleChange} />
          <input type="text" name="equipment" placeholder="Equipment Name" value={formData.equipment} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
        </>
      )}

      {category === "Technical/ Account" && (
        <>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <input type="text" name="device" placeholder="Device" value={formData.device} onChange={handleChange} />
          <input type="text" name="browser" placeholder="Browser" value={formData.browser} onChange={handleChange} />
        </>
      )}
    </>
  );
}

export default DynamicFields;