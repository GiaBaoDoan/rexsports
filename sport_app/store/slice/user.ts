import { getUserById } from "@/store/thunk/get-userById";
import { ApiError } from "@/types/types";
import { UserResType } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface UserState {
  user: UserResType | null;
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AxiosError<ApiError>;
      });
  },
});

export default UserSlice.reducer;
