import { FormEvent, useState, useEffect } from "react";
import "./App.css";
import profilePic from "./assets/Profile.png";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { ITeacher } from "./types/teacherType";
import { fetchTeachers, addTeacher, deleteTeacher } from "./redux/teacherSlice";
import TeacherTable from "./components/TeacherTable";

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
  const { teacherList, isLoading, errMessage } = useAppSelector(
    (state) => state.teacher
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "photo") {
      if (!e.target.files) return;
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setTeacher({ ...teacher, [e.target.name]: e.target.files[0] });
      return;
    }
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };
  const handleDelete = (id: string) => {
    dispatch(deleteTeacher(id));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", teacher.name);
    myForm.set("address", teacher.address as string);
    myForm.set("email", teacher.email);
    myForm.set("fatherName", teacher.fatherName as string);
    myForm.set("subject", teacher.subject as string);
    myForm.set("dob", teacher.dob as string);
    myForm.set("photo", teacher.photo as File);
    dispatch(addTeacher(myForm));
    setImagePreview(profilePic);
    setTeacher(initTeacher);
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="App">
      {errMessage && <div>Error: {errMessage}</div>}
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
            <label htmlFor="dob">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
            />
          </div>
          <div className="control">
            <label htmlFor="photo" className="btnLink">
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
      <TeacherTable teacherList={teacherList} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
