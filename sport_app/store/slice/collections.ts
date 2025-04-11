import { removeVietnameseTones } from "@/lib/string";
import { getAllCollections } from "@/store/thunk/fetch-collections";
import { CollectionResType } from "@/types/collection";
import { ApiError } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  collections: CollectionResType[];
  original: CollectionResType[];
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  collections: [],
  original: [],
  isLoading: false,
  error: null,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    filterByName: (state, action) => {
      const key = action.payload.toLowerCase();
      state.collections = state.original.filter((coll) =>
        removeVietnameseTones(coll.name)
          .toLowerCase()
          .includes(removeVietnameseTones(key))
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCollections.fulfilled, (state, action) => {
      state.collections = state.original = action.payload.data;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getAllCollections.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCollections.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export default collectionsSlice.reducer;
