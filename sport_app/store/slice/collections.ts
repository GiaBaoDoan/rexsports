import { getAllCollections } from "@/store/thunk/fetch-collections";
import { CollectionResType } from "@/types/collection";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  collections: CollectionResType[] | null;
  isLoading: boolean;
  error?: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  collections: [],
  isLoading: false,
  error: null,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCollections.fulfilled, (state, action) => {
      state.collections = action.payload.data as CollectionResType[];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getAllCollections.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCollections.rejected, (state, action) => {
      state.collections = [];
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export default collectionsSlice.reducer;
