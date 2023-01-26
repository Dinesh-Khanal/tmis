import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "./api";
import { ITeacher } from "../types/teacherType";

export const fetchTeachers = createAsyncThunk("teacher/fetch", async () => {
  const result = await API.get("/teachers");
  return result.data;
});
export const addTeacher = createAsyncThunk(
  "teacher/add",
  async (teacherData: FormData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const result = await API.post("/teacher/new", teacherData, config);
    return result.data;
  }
);

const initialState = {
  teacher: {} as ITeacher,
  teacherList: [] as ITeacher[],
  isLoading: false,
  errMessage: "",
};
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTeachers.pending || addTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTeachers.fulfilled,
        (state, action: PayloadAction<ITeacher[]>) => {
          state.isLoading = false;
          state.teacherList = action.payload;
        }
      )
      .addCase(
        fetchTeachers.rejected || addTeacher.rejected,
        (state, action) => {
          state.isLoading = false;
          state.errMessage = action.error.message || "";
        }
      );
  },
});
export default teacherSlice.reducer;
