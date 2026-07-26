function CategorySelector({ category, handleChange }) {
    return (
        <select name="category" value={category} onChange={handleChange}>
            <option value="">Select Issue Category</option>
            <option value="Booking Issue">Booking Issue</option>
            <option value="Payment and Refund Issue">Payment Issue</option>
            <option value="Equipment and Venue Issue">Equipment and Venue Issue</option>
            <option value="Technical/ Account">Technical/ Account Issue</option>
        </select>
    );
}

export default CategorySelector;