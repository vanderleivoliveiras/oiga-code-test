import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CoursesTable from "./coursesTable";
import ModalRates from "./modalRates";


function Courses() {
    const [courses, setCourses] = useState(null);
    const [evaluations, setEvaluations] = useState(null);
    const [filteredEvaluations, setFilteredEvaluations] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                "https://localhost:7225/Course"
            );
            setCourses(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const GetCourseEvaluation = async (courseId) => {
        setLoading(true);
        try {
            const result = await axios.get(
                "https://localhost:7225/Evaluation/GetCourseEvaluation", { params: { courseId: courseId } },
            );

            document.getElementById('btnModal').click();
            setEvaluations(result.data);
            setFilteredEvaluations(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const filterByRating = (eventTarget) => {
        setFilteredEvaluations(evaluations.filter(evaluation => evaluation.stars == eventTarget.value));
    };

    return (
        <div >
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row justify-content-center">
                <div className="col-12">
                    <CoursesTable courses={courses} GetCourseEvaluation={GetCourseEvaluation} />
                </div>
            </div>

            <ModalRates filterByRating={filterByRating} filteredEvaluations={filteredEvaluations} />
        </div>
    );
}

export default Courses;


