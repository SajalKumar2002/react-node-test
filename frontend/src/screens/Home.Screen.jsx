import React, { useCallback, useEffect, useState } from "react";
import http from "../axios";
import TableRecord from "../components/TableRecord.Component";

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberIndicator, setPageNumberIndicator] = useState([1, 2, 3, 4]);
  const [tableLimit, setTableLimit] = useState(0);

  const getTableData = useCallback(
    async (page) => {
      try {
        const response = await http.get(`/data/${page}`);
        if (response.status === 200) {
          setTableData(response.data);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
    [currentPage]
  );

  const HandleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const deleteData = async (id) => {
    try {
      const response = await http.delete(`/data/${id}`);
      if (response.status === 200) {
        alert("Record deleted successfully");
        getTableData(currentPage);
      }
    } catch (error) {
      console.log(error);
      alert("Deletion failed");
    }
  };


  const handlePageChange = useCallback(() => {
    if (currentPage >= 3 && currentPage + 1 <= tableLimit / 10) {
      setPageNumberIndicator([
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ]);
    }
  }, [currentPage, tableLimit]);

  useEffect(() => {
    getTableData(currentPage);
    handlePageChange();
  }, [currentPage, getTableData, handlePageChange]);

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const response = await http.get("/data/limit");
        setTableLimit(response.data);
      } catch (error) {
        console.error("Error fetching table limit:", error);
      }
    };

    fetchLimit();
  }, []);

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
          <div className="col-10">
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
                  <TableRecord
                    data={data}
                    index={index}
                    key={index}
                    deleteData={deleteData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="container my-3">
        <div className="row col-lg-8 col-md-10 col-sm-12">
          <div className="row mx-auto">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((value) => value - 1)}
              >
                {"<"}Previous
              </button>
              <div>
                {pageNumberIndicator.map((currentPageIndicator) => (
                  <button
                    className={`btn ${
                      currentPage === currentPageIndicator
                        ? "border-dark"
                        : null
                    } `}
                    key={currentPageIndicator}
                    onClick={() => setCurrentPage(currentPageIndicator)}
                  >
                    {currentPageIndicator}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-secondary"
                disabled={currentPage >= tableLimit / 10}
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
