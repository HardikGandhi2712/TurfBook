function UserDetails({ formData, handleChange }) {
  return (
    <>
      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}/>
      <input type="text" name="phone" placeholder="Phone Number" maxLength="10" value={formData.phone} onChange={handleChange}/>
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}/>
    </>
  );
}

export default UserDetails;