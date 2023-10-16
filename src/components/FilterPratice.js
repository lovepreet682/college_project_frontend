import React, { useEffect, useState } from "react";
import axios from "axios";

function FilterPratice() {
    const [fetchData, setFetchData] = useState([]);
    const [messFilter, setMessFilter] = useState('');
    const [hostlerFilter, setHostlerFilter] = useState('');
    const [courseFilter, setCourseFilter] = useState('');

    //Search Filter 
    const handleHostler = (e) => {
        setHostlerFilter(e.target.value)
        console.log(setHostlerFilter);
    }
    const handleMess = (e) => {
        setMessFilter(e.target.value)
    }
    const handleCourse = (e) => {
        setCourseFilter(e.target.value)
    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/data")
            .then((res) => {
                setFetchData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filterData = () => {
        let filteredData = [...fetchData]; // Create a copy of fetchData
        if (messFilter !== '') {
            filteredData = filteredData.filter(data => data.mess === messFilter);
            console.log("filteredData (after filter):", filteredData);
        }

        if (hostlerFilter !== '') {
            filteredData = filteredData.filter(data => data.hostel === hostlerFilter);
        }

        if (courseFilter !== '') {
            filteredData = filteredData.filter(data => data.course === courseFilter);
        }

        return filteredData;
    }

    const filteredData = filterData();

    return (
        <div>
            <div className="container-fluid">
                <div id="recordingData">
                    <div className="row">
                        <div className="col-md-2 col-lg-2">
                            <div id="filterSection">
                                <div className="gender mb-3">
                                    <h6>Mess Membership</h6>
                                    <div class="form-check">
                                        <input class="form-check-input" onChange={handleMess} value="YES" checked={messFilter === "Yes"}
                                            type="radio" name="messMembership" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" onChange={handleMess} value="NO" checked={messFilter === "No"} type="radio"
                                            name="messMembership" id="flexRadioDefault2" />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div className="gender mb-3">
                                    <h6>Are You Hostler</h6>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" onChange={handleHostler} value="YES"
                                            checked={hostlerFilter === "Yes"} name="areYouHostler" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" onChange={handleHostler} value="NO"
                                            checked={hostlerFilter === "No"} name="areYouHostler" id="flexRadioDefault2" />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            No
                                        </label>
                                    </div>
                                </div>

                                <div className="jobPosition">
                                    <h6>Select Course</h6>
                                    <select class="" onChange={handleCourse} value={courseFilter} aria-label="Default select example">
                                        <option selected>Choose Course</option>
                                        <option value="BTECH">B.Tech</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MCA">MCA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="BBA">BBA</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-10 col-lg-10">
                            <table className="table table-striped">
                                <thead>
                                    <tr className="table-dark text-center">
                                        <th scope="col">Roll No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Course</th>
                                        <th scope="col">City</th>
                                        <th scope="col">Mess</th>
                                        <th scope="col">Hostel</th>
                                        <th scope="col">Date </th>
                                        <th scope="col">Operation</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {filteredData.length === 0 ? (
                                        <h4 className="text-center">Data is Not exists</h4>
                                    ) : (<>
                                        {filteredData.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.rollno}</td>
                                                <td>{data.name}</td>
                                                <td>{data.course}</td>
                                                <td>{data.city}</td>
                                                <td>{data.mess}</td>
                                                <td>{data.hostel}</td>
                                                <td>{(data.date)}</td>
                                                <th>
                                                    <button className="btn btn-danger">Delete</button>
                                                    <button className="btn btn-warning mx-2">Update</button>
                                                </th>
                                            </tr>
                                        ))}
                                    </>)}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPratice