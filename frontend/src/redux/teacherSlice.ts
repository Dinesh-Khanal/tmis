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
export const updateTeacher = createAsyncThunk(
  "teacher/update",
  async ({ id, teacherData }: { id: string; teacherData: FormData }) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const result = await API.put(`/teacher/${id}`, teacherData, config);
    return result.data;
  }
);
export const deleteTeacher = createAsyncThunk(
  "teacher/delete",
  async (id: string) => {
    const result = await API.delete(`/teacher/${id}`);
    return result.data;
  }
);

const initialState = {
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
        addTeacher.fulfilled,
        (state, action: PayloadAction<ITeacher>) => {
          state.isLoading = false;
          state.teacherList.push(action.payload);
        }
      )
      .addCase(
        fetchTeachers.rejected || addTeacher.rejected,
        (state, action) => {
          state.isLoading = false;
          state.errMessage = action.error.message || "";
        }
      );
    builder
      .addCase(deleteTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteTeacher.fulfilled,
        (state, action: PayloadAction<ITeacher>) => {
          state.teacherList = state.teacherList.filter(
            (t) => t._id !== action.payload._id
          );
          state.isLoading = false;
        }
      )
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.errMessage = action.error.message || "";
      });
    builder
      .addCase(updateTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateTeacher.fulfilled,
        (state, action: PayloadAction<ITeacher>) => {
          const index = state.teacherList.findIndex(
            (t) => t._id === action.payload._id
          );
          state.teacherList.splice(index, 1, action.payload);
          // state.teacherList = state.teacherList.map((t) =>
          //   t._id === action.payload._id ? action.payload : t
          // );
          state.isLoading = false;
        }
      )
      .addCase(updateTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.errMessage = action.error.message || "";
      });
  },
});
export default teacherSlice.reducer;
