import { combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./slice/cart";
import ProductsReducer from "./slice/products";
import ProductReducer from "./slice/product";
import OrdersReducer from "./slice/orders";
import OrderReducer from "./slice/order";
import CategoriesReducer from "./slice/categories";
import CategoryReducer from "./slice/category";
import BannersReducer from "./slice/banners";
import BannerByIdReducer from "./slice/bannerById";
import collectionByIdReducer from "./slice/collectionById";
import CollectionsReducer from "./slice/collections";
import RevenueReducer from "@/store/slice/revenue";
const rootReducer = combineReducers({
  ProductsReducer,
  ProductReducer,
  CartReducer,
  OrdersReducer,
  OrderReducer,
  CategoryReducer,
  CategoriesReducer,
  BannersReducer,
  CollectionsReducer,
  BannerByIdReducer,
  collectionByIdReducer,
  RevenueReducer,
});

export default rootReducer;
