import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./starRating";
import useForm from '../hooks/useForm';

function Evalutaion() {
    const [students, setStudents] = useState(null);
    const [courses, setCourses] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [{ values, formLoading }, handleChange, handleSubmit] = useForm();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        GetStudents();
    }, []);

    const GetStudents = async () => {
        setLoading(true);
        try {
            const result = await axios.get(
                "https://localhost:7225/WeatherForecast/GetStudents"
            );
            setStudents(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const GetCoursesByStudent = async (eventTarget) => {

        setLoading(true);
        try {
            const result = await axios.get(
                "https://localhost:7225/WeatherForecast/GetCoursesByStudent", { params: { studentId: eventTarget.value } },
            );
            console.log(result.data);
            setCourses(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const insertEvaluation = async () => {
        
        try {
            const result = await axios.post(
                "https://localhost:7225/WeatherForecast/InsertEvaluation", { 'studentId': values.Student, 'courseId': values.Course, 'stars': rating, 'description': 'teste' },
            );
            console.log(result.data);
            setCourses(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }

        console.log(values);
    };

    return (
        <>
            <h1>Evaluations</h1>

            <form onSubmit={handleSubmit(insertEvaluation)}>
                <select name="Student" className="form-select" aria-label="Default select example" onChange={(e) => {GetCoursesByStudent(e.target); handleChange(e)}}>
                    <option selected>Open this select menu</option>
                    {students?.map((student) => (
                        <option value={student.id}>{student.name} - {student.lastName}</option>
                    ))}
                </select>
                {courses &&
                    <select name="Course" className="form-select" aria-label="Default select example" onChange={(e) => handleChange(e)}>
                        <option selected>Open this select menu</option>
                        {courses?.map((course) => (
                            <option value={course.id}>{course.name}</option>
                        ))}
                    </select>
                }

                <StarRating rating={rating} setRating={setRating} hover={hover} setHover={setHover} />
                <button type="submit">{loading ? 'Enviando...' : 'Enviar'}</button>
            </form>


        </>
    );
};

export default Evalutaion;