import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
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

    const GetCourseEvaluation = async (eventTarget) => {

        setLoading(true);
        try {
            const result = await axios.get(
                "https://localhost:7225/WeatherForecast/GetCourseEvaluation", { params: { studentId: eventTarget.value } },
            );
            console.log(result.data);
            setCourses(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {loading && <p>Courses are loading!</p>}
            {error && <p>{error}</p>}
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
                        <tr onClick={GetCourseEvaluation}>
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

export default Home;