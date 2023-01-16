import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./starRating";
import useForm from '../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                "https://localhost:7225/Student/GetStudents"
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
                "https://localhost:7225/Course/GetCoursesByStudent", { params: { studentId: eventTarget.value } },
            );
            setCourses(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const insertEvaluation = async () => {

        try {
            await axios.post(
                "https://localhost:7225/Evaluation/InsertEvaluation", { 'studentId': values.Student, 'courseId': values.Course, 'stars': rating, 'description': values.Description },
            );
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
            document.getElementById("evaluation-form").reset();
            toast.success("Evaluation added!")
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <h1>Evaluate Courses</h1>

                    <form id="evaluation-form" onSubmit={handleSubmit(insertEvaluation)}>

                        <div className="row pb-3 form-floating">
                            <select id="student-select" name="Student" className="form-select" aria-label="Default select example" placeholder="Student" onChange={(e) => { GetCoursesByStudent(e.target); handleChange(e) }}>
                                <option selected>Select...</option>
                                {students?.map((student) => (
                                    <option value={student.id}>{student.name} - {student.lastName}</option>
                                ))}
                            </select>
                            <label for="student-select">Student</label>
                        </div>
                        {courses &&
                            <div className="row pb-3 form-floating">
                                <select name="Course" className="form-select" aria-label="Default select example" id="course-select" placeholder="Course" onChange={(e) => handleChange(e)}>
                                    <option selected>Select...</option>
                                    {courses?.map((course) => (
                                        <option value={course.id}>{course.name}</option>
                                    ))}
                                </select>
                                <label for="course-select">Course</label>

                            </div>
                        }

                        <div className="row pb-3 form-floating">
                            <textarea class="form-control" name="Description" id="description-text-area" placeholder="Description" style={{ height: '150px' }} onChange={(e) => handleChange(e)}></textarea>
                            <label for="description-text-area">Description</label>
                        </div>
                        <div className="row pb-3">
                            <StarRating rating={rating} setRating={setRating} hover={hover} setHover={setHover} />
                        </div>
                        <div className="row pb-3">

                            <button className="btn btn-primary" type="submit">{loading ? 'Enviando...' : 'Enviar'}</button>
                        </div>

                    </form>
                </div>
            </div>


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Evalutaion;