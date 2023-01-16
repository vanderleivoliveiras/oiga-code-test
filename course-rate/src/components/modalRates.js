

const ModalRates = ({filterByRating, filteredEvaluations}) => {
    return <>
        <button id="btnModal" hidden type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        </button>

        <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div className="form-floating">
                            <select id="rating-select" placeholder="Rating" class="form-select" aria-label="Select..." onChange={(e) => filterByRating(e.target)}>
                                <option value="0" defaultValue>Select...</option>
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
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default ModalRates;