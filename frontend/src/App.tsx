import { FormEvent, useState } from "react";
import "./App.css";
import profilePic from "./assets/Profile.png";
import { ITeacher } from "./types/teacherType";

const initTeacher: ITeacher = {
  name: "",
  address: "",
  email: "",
  fatherName: "",
  subject: "",
  dob: "",
  photo: profilePic,
};
function App() {
  const [teacher, setTeacher] = useState(initTeacher);
  const [imagePreview, setImagePreview] = useState<string>(profilePic);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "photo") {
      if (!e.target.files) return;
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setTeacher({ ...teacher, [e.target.name]: e.target.files[0] });
    }
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="App">
      <h1>Teacher Record Keeping System</h1>
      <div className="frmUpper">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={teacher.name}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={teacher.address}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="fatherName">Father's Name</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={teacher.fatherName}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="dob">Date of birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={teacher.dob}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="photo" className="btnPhoto">
              Upload photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Submit data" />
        </form>
        <div className="imgPreview">
          <img src={imagePreview} alt="profile picture" />
        </div>
      </div>
    </div>
  );
}

export default App;
