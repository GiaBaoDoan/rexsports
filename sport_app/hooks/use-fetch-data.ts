import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";

const useFetchData = (thunkAction: () => any, dependencies: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkAction());
  }, [...dependencies, dispatch]);
};

export default useFetchData;
