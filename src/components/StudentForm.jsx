
import { useState } from "react";
import useThrottle from "../hooks/useThrottle.js";

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function submitStudent(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.age ||
      !formData.course.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (Number(formData.age) < 1 || Number(formData.age) > 120) {
      setError("Please enter a valid age.");
      return;
    }

    setError("");

    onAddStudent({
      ...formData,
      age: Number(formData.age),
    });

    setFormData({
      name: "",
      email: "",
      age: "",
      course: "",
    });
  }

  const throttledSubmit = useThrottle(submitStudent, 1000);

  return (
    <section className="form-card">
      <h2>Register New Student</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={throttledSubmit}>
        <label>Student Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={formData.age}
          onChange={handleChange}
        />

        <label>Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
        >
          <option value="">Select course</option>
          <option value="Software Development">
            Software Development
          </option>
          <option value="Networking">Networking</option>
          <option value="Multimedia">Multimedia</option>
          <option value="Computer Science">Computer Science</option>
        </select>

        <button type="submit" className="submit-button">
          Register Student
        </button>
      </form>
    </section>
  );
}

export default StudentForm;
