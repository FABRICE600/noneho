
function StudentDetails({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="details-card"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="student-avatar large-avatar">
          {student.name.charAt(0).toUpperCase()}
        </div>

        <h2>Student Details</h2>

        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Course:</strong> {student.course}</p>

        <button className="submit-button" onClick={onClose}>
          Close Details
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;
