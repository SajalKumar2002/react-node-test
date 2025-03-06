import React, { useState } from "react";

import http from "../axios";

import Close from "../svg/CloseCircle-Bold-32px.svg";
import Setting from "../svg/Setting2-Bold-32px.svg";

const TableRecord = ({ data, index, deleteData }) => {

  const cstmRole = ["Admin", "Publisher", "Reviewer", "Moderator", "Customer"];
  const cstmStatus = ["Active", "Inactive", "Suspended"];

  const [updatedData, setUpdatedData] = useState(data);
  const [showUpdate, setShowUpdate] = useState(false);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
    return formattedDate;
  };

  const updateData = async (id) => {
    try {
      const response = await http.patch(`/data/${id}`, updatedData);
      if (response.status === 200) {
        setUpdatedData(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("Operation failed");
    }
  };

  const handleUpdate = (id) => {
    if (!showUpdate) {
      setShowUpdate(!showUpdate);
    } else {
      setShowUpdate(!showUpdate);
      updateData(id);
    }
  };

  return (
    <tr>
      <td className="align-content-center">{index + 1}</td>
      <td className="align-content-center">
        {showUpdate ? (
          <input
            type="text"
            className="form-control"
            value={updatedData.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
        ) : (
          <span className="form-control border-0">{updatedData.name}</span>
        )}
      </td>
      <td className="align-content-center">
        {formatDate(updatedData.createdAt)}
      </td>
      <td className="align-content-center">
        {showUpdate ? (
          <select
            className="form-control"
            value={updatedData.role}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, role: e.target.value })
            }
          >
            {cstmRole.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        ) : (
          <span className="form-control border-0">{updatedData.role}</span>
        )}
      </td>
      <td className="align-content-center">
        {showUpdate ? (
          <select
            className="form-control"
            value={updatedData.status}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, status: e.target.value })
            }
          >
            {cstmStatus.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        ) : (
          <span className="form-control border-0">{updatedData.status}</span>
        )}
      </td>
      <td className="">
        <div className="d-flex justify-content-around">
          <button
            className="btn p-0"
            onClick={() => handleUpdate(updatedData._id)}
          >
            <img src={Setting} height={30} alt="" />
          </button>
          <button
            className="btn p-0"
            onClick={() => deleteData(updatedData._id)}
          >
            <img src={Close} height={30} alt="" className="pe-auto" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRecord;
