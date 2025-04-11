import { removeVietnameseTones } from "@/lib/string";
import { getAllUsersThunk } from "@/store/thunk/get-users";
import { ApiError, PaginationRes } from "@/types/types";
import { UserResType } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface UsersState {
  users: UserResType[];
  original: UserResType[];
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
  pagination: PaginationRes | null;
}

const initialState: UsersState = {
  users: [],
  original: [],
  isLoading: false,
  error: null,
  pagination: null,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterByEmail: (state, action) => {
      const key = action.payload.toLowerCase();
      state.users = state.original.filter((user) =>
        removeVietnameseTones(user.email)
          .toLowerCase()
          .includes(removeVietnameseTones(key))
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = state.original = action.payload.data;
        state.isLoading = false;
        state.pagination = action.payload.pagination as PaginationRes;
        state.error = null;
      })
      .addCase(getAllUsersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AxiosError<ApiError>;
      });
  },
});

export const { filterByEmail } = UsersSlice.actions;

export default UsersSlice.reducer;
