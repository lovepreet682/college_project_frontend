import React, { useEffect, useState } from "react";
import axios from "axios";

function NewFilterData() {
    const [fetchData, setFetchData] = useState([]);
    const [storeSearchData, setStoreSearchData] = useState([]);
    const [searchData, setSearchData] = useState({
        name: "",
        city: "",
        course: "",
        rollno: ""
    });

    const [messFilter, setMessFilter] = useState('');
    const [hostlerFilter, setHostlerFilter] = useState('');
    const [courseFilter, setCourseFilter] = useState('');

    ///////// handle search form///////
    const changeSearchData = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value);
        setSearchData({ ...searchData, [name]: value });
    };

    //Make a filter Option
    const filteredData = () => {
        console.log("Click Me");
        let selectFilterData = [...storeSearchData];
        console.log("Value Coming", selectFilterData);
        if (messFilter !== "") {
            selectFilterData = selectFilterData.filter((data) => data.mess === messFilter)
        }
        if (hostlerFilter !== '') {
            selectFilterData = selectFilterData.filter(data => data.hostel === hostlerFilter);
        }

        if (courseFilter !== '') {
            selectFilterData = selectFilterData.filter(data => data.course === courseFilter);
        }

        console.log("Value Coming (after filtering)", selectFilterData);
        return filteredData;
    }

    let selectFilterData = filteredData();


    //Search Filter 
    const handleHostler = (e) => {
        setHostlerFilter(e.target.value);
    }

    const handleMess = (e) => {
        setMessFilter(e.target.value)
        // console.log(setMessFilter);
    }

    const handleCourse = (e) => {
        setCourseFilter(e.target.value)
    }

    ////////////SearchData////////////
    const handleSearch = () => {
        if (!(searchData.name || searchData.city || searchData.course || searchData.roll)) {
            alert("Please provide at least one search criterion.");
        } else {
            axios
                .get(" http://192.168.29.172:5000/search", {
                    params: searchData,
                })
                .then((res) => {
                    setFetchData(res.data);
                    setStoreSearchData(res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    /////Handle Reset Button ///////////
    const handleReset = () => {
        setSearchData({
            name: "",
            city: "",
            course: "",
            rollno: ""
        });
        axios
            .get(" http://192.168.29.172:5000/data")
            .then((res) => {
                setFetchData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setStoreSearchData("")
        setHostlerFilter("")
        setMessFilter("")
    };

// console.log(storeSearchData);

    //format the date
    const formatDate = (date) => {
        const parseDate = new Date(date);
        let getDay = parseDate.getDay();
        let getMonth = parseDate.getMonth() + 1;
        let getYear = parseDate.getFullYear();
        return `${getDay}-${getMonth}-${getYear}`;
    };

    useEffect(() => {
        axios
            .get(" http://192.168.29.172:5000/data")
            .then((res) => {
                setFetchData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log("StoreSearchData length", storeSearchData.length);
    console.log("SelectFilterData",selectFilterData.length);
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
                                        <input class="form-check-input" onChange={handleMess} value="YES" checked={messFilter === "YES"}
                                            type="radio" name="messMembership" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" onChange={handleMess} value="NO" checked={messFilter === "NO"} type="radio"
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
                                            checked={hostlerFilter === "YES"} name="areYouHostler" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" onChange={handleHostler} value="NO"
                                            checked={hostlerFilter === "NO"} name="areYouHostler" id="flexRadioDefault2" />
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
                            <div className="row mt-3 mb-1">
                                <div className="col-md-2 col-lg-2 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name"
                                        name="name"
                                        value={searchData.name}
                                        onChange={changeSearchData}
                                        id=""
                                    />
                                </div>
                                <div className="col-md-2 col-lg-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="city"
                                        name="city"
                                        value={searchData.city}
                                        onChange={changeSearchData}
                                        id=""
                                    />
                                </div>
                                <div className="col-md-2 col-lg-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="course"
                                        name="course"
                                        value={searchData.course}
                                        onChange={changeSearchData}
                                        id=""
                                    />
                                </div>
                                <div className="col-md-2 col-lg-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Roll No"
                                        name="rollno"
                                        value={searchData.rollno}
                                        onChange={changeSearchData}
                                        id=""
                                    />
                                </div>

                                <div className="col-md-2 col-lg-2">
                                    <button className="btn btn-danger mx-2" onClick={handleSearch}>
                                        Search
                                    </button>
                                    <button className="btn btn-warning" onClick={handleReset}>
                                        Reset
                                    </button>
                                </div>
                            </div>
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
                                    {selectFilterData.length===0 ? (    
                                        <>                        
                                        <h4 className="text-center">Data is Not exists</h4>
                                        {console.log(selectFilterData)}
                                        </>
                                        
                                    )                                 
                                    : (<>
                                        {selectFilterData.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.rollno}</td>
                                                <td>{data.name}</td>
                                                <td>{data.course}</td>
                                                <td>{data.city}</td>
                                                <td>{data.mess}</td>
                                                <td>{data.hostel}</td>
                                                <td>{formatDate(data.date)}</td>
                                                <th>
                                                    <button className="btn btn-danger">Delete</button>
                                                    <button className="btn btn-warning mx-2">Update</button>
                                                </th>
                                            </tr>
                                        ))}
                                    </>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewFilterData