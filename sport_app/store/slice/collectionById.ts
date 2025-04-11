import { fetchCollectionById } from "@/store/thunk/fetch-collectionById";
import { CollectionResType } from "@/types/collection";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  collection: CollectionResType | null;
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  collection: null,
  isLoading: false,
  error: null,
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCollectionById.fulfilled, (state, action) => {
      state.collection = action.payload.data;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchCollectionById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCollectionById.rejected, (state, action) => {
      state.collection = null;
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export default collectionSlice.reducer;
