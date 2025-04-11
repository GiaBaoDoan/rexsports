import { getAllUsersThunk } from "@/store/thunk/get-users";
import { ApiError } from "@/types/types";
import { UserResType } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface UsersState {
  users: UserResType[];
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AxiosError<ApiError>;
      });
  },
});

export default UsersSlice.reducer;
