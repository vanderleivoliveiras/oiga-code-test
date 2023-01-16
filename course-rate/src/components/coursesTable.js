const CoursesTable = ({courses, GetCourseEvaluation}) => {
    return <table className="table table-striped table-hover">
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
                <tr key={course.id} onClick={() => GetCourseEvaluation(course.id)} style={{ cursor: 'pointer' }}>
                    <th scope="row">{course.id}</th>
                    <td>{course.name}</td>
                    <td>{new Date(course.creationDate).toLocaleDateString()}</td>
                    <td>{course.active ? "Yes" : "No"}</td>
                </tr>

            ))}
        </tbody>
    </table>;
}

export default CoursesTable;