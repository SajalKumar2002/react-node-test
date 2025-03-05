import React, { useEffect, useState } from "react";
import http from "../axios";

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
    return formattedDate;
  };

  const getTableData = async () => {
    try {
      const response = await http.get(`/data/${currentPage}`);
      setTableData(response.data);
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  const HandleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    getTableData();
  }, [getTableData, currentPage]);

  return (
    <>
      {/* Navbar */}
      <div className="container-fluid bg-dark mb-3">
        <div className="row text-white justify-content-between py-2">
          <div className="col">
            <span className="fs-1">Home Page</span>
          </div>
          <div className="col align-content-center text-end">
            <button className="btn btn-primary " onClick={HandleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Options */}
      {/* <div className="container mb-3">
        <div className="row bg-option">
          <div className="col p-2">
            <span className="m-0">Options</span>
          </div>
        </div>
      </div> */}

      {/* Table */}
      <div className="container">
        <div className="row text-center">
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{formatDate(data.createdAt)}</td>
                    <td>{data.role}</td>
                    <td>{data.status}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="d-flex justify-content-around mb-3">
              <button
                className="btn btn-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((value) => value - 1)}
              >
                {"<"}Previous
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentPage((value) => value + 1)}
              >
                Next{">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
