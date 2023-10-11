import React, { useEffect, useState } from "react";
import axios from "axios";
function AllData() {
    const [fetchData, setFetchData] = useState([]);
    // const [storeSearchData, setStoreSearchData] = useState([]);
    const [searchData, setSearchData] = useState({
        name: "",
        city: "",
        fromdate: "",
        to_date: "",
    });

    ///////// handle search form///////
    const changeSearchData = (e) => {
        const { name, value } = e.target;
        setSearchData({ [name]: value });
    };

    ////////////SearchData////////////
    const handleSearch = () => {
        if (
            searchData.name === "" ||
            searchData.city == "" ||
            searchData.to_date == "" ||
            searchData.fromdate
        ) {
            alert("Please provide at least one search criterion.");
        } else {
            axios
                .get("http://192.168.29.249:5000/search", {
                    params: searchData,
                })
                .then((res) => {
                    setFetchData(res.data);
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
            fromdate: "",
            to_date: "",
        });
        axios
            .get("http://192.168.29.249:5000/data")
            .then((res) => {
                setFetchData(res.data);
                console.log("API Response:", res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
            .get("http://192.168.29.249:5000/data")
            .then((res) => {
                setFetchData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="container">
                <div className="pt-4  ">
                    <div className="row mb-1 ">
                        <div className="col-md-2">
                            <div id="filterSection">
                                <div className="gender">
                                    <h6>Gender</h6>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Default radio
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Default checked radio
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-lg-2">
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
                                type="date"
                                className="form-control"
                                placeholder="From Date"
                                name="fromdate"
                                value={searchData.fromdate}
                                onChange={changeSearchData}
                                id=""
                            />
                        </div>
                        To
                        <div className="col-md-2 col-lg-2">
                            <input
                                type="date"
                                className="form-control"
                                placeholder="From Date"
                                name="fromdate"
                                value={searchData.to_date}
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
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">City</th>
                            <th scope="col">Date</th>
                            <th scope="col">Operation </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchData.map((data, index) => (
                            <tr key={data.id}>
                                <th scope="row">{data.id}</th>
                                <td>{data.name}</td>
                                <td>{data.gender}</td>
                                <td>{data.city}</td>
                                <td>{formatDate(data.date)}</td>
                                <th>
                                    <button className="btn btn-danger">Delete</button>
                                    <button className="btn btn-warning mx-2">Update</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AllData;
