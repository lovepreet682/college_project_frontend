import React, { useState } from 'react'
import DATA from './DATA.js'
import ReactPaginate from 'react-paginate';

function Paginate() {
    const [fetchData, setFetchData] = useState(DATA.slice(0, 100));
    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 9;
    const pageClick = pageNumber * perPage;
    const countPage = Math.ceil(fetchData.length / perPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">

                    </div>

                    <div className="col-md-9">
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

export default Paginate