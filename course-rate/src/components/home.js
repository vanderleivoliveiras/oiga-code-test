import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Table from "./table";


function Home() {
    const [courses, setCourses] = useState(null);
    const [evaluations, setEvaluations] = useState(null);
    const [filteredEvaluations, setFilteredEvaluations] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCourses();
    }, []);


    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Creation Date',
                accessor: 'creationDate',
            },
            {
                Header: 'Active',
                accessor: 'active',
            },
        ],
        []
    )

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
            {loading && <p>Courses are loading!</p>}
            {error && <p>{error}</p>}
            {/* {courses !== null &&
                <Table columns={columns} data={courses} handleRowClick={() => GetCourseEvaluation} />
            
            } */}
            <div className="row justify-content-center">
                <div className="col-12">
                    
                
            <table className="table table-striped table-hover">
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
                        <tr key={course.id} onClick={() => GetCourseEvaluation(course.id)}>
                            <th scope="row">{course.id}</th>
                            <td>{course.name}</td>
                            <td>{new Date(course.creationDate).toLocaleDateString()}</td>
                            <td>{course.active ? "Yes" : "No"}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
            </div>
            </div>
            <button id="btnModal" hidden type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div className="form-floating">
                            <select id="rating-select" placeholder="Rating" class="form-select" aria-label="Select..." onChange={(e) => filterByRating(e.target)}>
                                <option selected>Select...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option value="5">Five</option>
                            </select>
                            <label for="rating-select">Rating</label>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Stars</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Creation Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEvaluations?.map((evaluation) => (
                                        <tr key={evaluation.id}>
                                            <th scope="row">{evaluation.id}</th>
                                            <td>{evaluation.stars}</td>
                                            <td>{evaluation.description}</td>
                                            <td>{new Date(evaluation.creationDate).toLocaleDateString()}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;