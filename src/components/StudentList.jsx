
function StudentList({ students, onDelete, onView }) {
  function handleCardClick(id) {
    onView(id);
  }

  function handleDelete(event, id) {
    event.stopPropagation();
    onDelete(id);
  }

  return (
    <section className="student-section">
      <h2>Registered Students</h2>

      {students.length === 0 ? (
        <p className="empty-message">No students found.</p>
      ) : (
        <div className="student-grid">
          {students.map((student) => (
            <div
              className="student-card"
              key={student.id}
              onClick={() => handleCardClick(student.id)}
            >
              <div className="student-avatar">
                {student.name.charAt(0).toUpperCase()}
              </div>

              <h3>{student.name}</h3>
              <p>{student.email}</p>
              <p>Age: {student.age}</p>
              <p>Course: {student.course}</p>

              <div className="card-actions">
                <button
                  onClick={() => onView(student.id)}
                  className="view-button"
                >
                  View Details
                </button>

                <button
                  onClick={(event) =>
                    handleDelete(event, student.id)
                  }
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default StudentList;
