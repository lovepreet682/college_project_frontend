import React, { useState } from 'react'
import DATA from './DATA.js'
import ReactPaginate from 'react-paginate';

function SortData() {
    const [fetchData, setFetchData] = useState(DATA.slice(0, 100));
    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 9;
    const pageClick = pageNumber * perPage;
    const countPage = Math.ceil(fetchData.length / perPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const [gender, setGender] = useState("")
    const handleGender = () => {

    }

    // Ascending Order
    const ascendingOrder = () => {
        let data = [...fetchData];
        if (data.length > 0) {
            let result = data.sort((a, b) => 
                a.name.localeCompare(b.name));
                setFetchData(result)
        }
    }

    // Descending Order
    const descendingOrder = () => {
        let data = [...fetchData];
        if (data.length > 0) {
            let result = data.sort((a, b) => 
                b.name.localeCompare(a.name));
                setFetchData(result)
        }
    }

    // Rest button
    const handleRest=()=>{
        setFetchData(DATA)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2" id='Filter'>
                        <div className="row">
                            <div className="col-md-10">
                                <button className='btn' id='restBtn' onClick={handleRest}>Rest</button>
                            </div>
                        </div>
                        <h6 className='text-center'>Filter</h6>
                        <div className="row">
                            <div className="col-md-10">
                                <button onClick={ascendingOrder} className='btn btn-outline-danger mb-2'>Sort A to Z</button> <br />
                                <button onClick={descendingOrder} className='btn btn-outline-warning mb-2'>Sort Z to A</button> <br />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-10">
                                <label for="gender">Choose Gender:</label>
                                <div class="form-check">
                                    <input class="form-check-input" onChange={handleGender} value="YES" checked={gender === "YES"}
                                        type="radio" name="messMembership" id="flexRadioDefault1" />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Yes
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" onChange={handleGender} value="NO" checked={gender === "NO"} type="radio"
                                        name="messMembership" id="flexRadioDefault2" />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 col-sm-12">
                        <table className="table table-striped">
                            <thead>
                                <tr className="table-dark text-center">
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Job</th>
                                    <th scope="col">Operation</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {fetchData.length === 0 ? (
                                    <h4 className="text-center">Data is Not exists</h4>
                                ) : (<>
                                    {fetchData.slice(pageClick, pageClick + perPage).map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.gender}</td>
                                            <td>{data.job}</td>
                                            <th>
                                                <button className="btn btn-danger">Delete</button>
                                            </th>
                                        </tr>
                                    ))}
                                </>)}

                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={countPage}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            activeClassName={"paginationActive"}
                            disabledClassName={"paginationDisabled"}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SortData