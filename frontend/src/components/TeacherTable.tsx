import React from "react";
import { ITeacher } from "../types/teacherType";
import moment from "moment";

interface TeacherProps {
  teacherList: ITeacher[];
  handleDelete: (id: string) => void;
  handleEdit: (teacher: ITeacher) => void;
}
const TeacherTable = ({
  teacherList,
  handleDelete,
  handleEdit,
}: TeacherProps) => {
  return (
    <>
      <h2>Teacher List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Father's Name</th>
            <th>Date of birth</th>
            <th>Subject</th>
            <th>Photo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {teacherList && (
          <tbody>
            {teacherList.map((t, i) => (
              <tr key={i}>
                <td>{t.name}</td>
                <td>{t.address}</td>
                <td>{t.email}</td>
                <td>{t.fatherName}</td>
                <td>{moment(t.dob).format("YYYY-MM-DD")}</td>
                <td>{t.subject}</td>
                <td>
                  <img
                    src={`http://localhost:5000/images/${t.photo}`}
                    alt={t.photo as string}
                  />
                </td>
                <td className="btnLink" onClick={() => handleEdit(t)}>
                  Edit
                </td>
                <td
                  className="btnLink"
                  onClick={() => handleDelete(t._id as string)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
};

export default TeacherTable;
