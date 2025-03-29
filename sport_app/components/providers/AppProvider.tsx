"use client";

import { setCarts } from "@/store/slice/cart";
import { store } from "@/store/store";
import { fetchCategories } from "@/store/thunk/fetch-categories";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    store.dispatch(setCarts(JSON.parse(localStorage.getItem("carts") || "[]")));
    store.dispatch(fetchCategories());
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
