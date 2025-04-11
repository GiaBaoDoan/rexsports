import { getProfileThunk } from "@/store/thunk/get-profile";
import { ApiError } from "@/types/types";
import { UserResType } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ProfileState {
  profile: UserResType | null;
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AxiosError<ApiError>;
      });
  },
});

export default ProfileSlice.reducer;
