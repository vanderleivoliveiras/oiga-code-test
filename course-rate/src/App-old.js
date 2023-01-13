import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handlePosts();
  }, []);

  const handlePosts = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "https://localhost:7225/WeatherForecast"
      );
      setCourses(result.data);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <p>Courses are loading!</p>}
      {error && <p>{error}</p>}
      <ul>

      </ul>


      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr>
              <th scope="row">{course.id}</th>
              <td>{course.name}</td>
              <td>{course.creationDate}</td>
              <td>{course.active}</td>
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
}

export default App;
