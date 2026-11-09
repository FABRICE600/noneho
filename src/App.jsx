
import { useState } from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";
import StudentSearch from "./components/StudentSearch.jsx";
import StudentDetails from "./components/StudentDetails.jsx";
import useKeyboardShortcut from "./hooks/useKeyboardShortcut.js";

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Fabrice Umuhire",
      email: "fabrice@example.com",
      age: 19,
      course: "Software Development",
    },
    {
      id: 2,
      name: "Jean Claude",
      email: "jean@example.com",
      age: 20,
      course: "Networking",
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: Date.now(),
    };

    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ]);

    setShowForm(false);
  }

  function deleteStudent(id) {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== id)
    );

    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }
  }

  function viewStudent(id) {
    const student = students.find((item) => item.id === id);
    setSelectedStudent(student || null);
  }

  // Ctrl + N opens the registration form
  useKeyboardShortcut("n", (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
      setShowForm(true);
    }
  });

  // Escape closes the student details
  useKeyboardShortcut("Escape", () => {
    setSelectedStudent(null);
  });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1>Student Management System</h1>
          <p>Manage student records easily and efficiently.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Register Student"}
        </button>
      </header>

      <section className="stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="stat-card">
          <h3>Search Results</h3>
          <p>{filteredStudents.length}</p>
        </div>
      </section>

      {showForm && (
        <StudentForm onAddStudent={addStudent} />
      )}

      <StudentSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <StudentList
        students={filteredStudents}
        onDelete={deleteStudent}
        onView={viewStudent}
      />

      {selectedStudent && (
        <StudentDetails
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      <footer>
        <p>Student Management System | React JS Project</p>
        <small>Keyboard shortcut: Ctrl + N to register a student.</small>
      </footer>
    </div>
  );
}

export default App;
