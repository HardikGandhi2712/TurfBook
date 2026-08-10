function IssueDetails({ formData, handleChange }) {
  return (
    <>
      <input type="text" name="issue" placeholder="Issue Title" value={formData.issue} onChange={handleChange} />
      <textarea rows="5" name="description" placeholder="Describe your issue..." value={formData.description} onChange={handleChange}></textarea>
    </>
  );
}

export default IssueDetails;