export const PATH = {
  products: {
    list: "/products",
    admin: "/dashboard/products",
    add: `/dashboard/products/add`,
    edit: (id: string) => `/dashboard/products/${id}`,
    detail: (id: string) => `/products/${id}`,
  },
  categories: {
    list: "/dashboard/categories",
    add: `/dashboard/categories/add`,
    edit: (id: string) => `/dashboard/categories/${id}`,
  },
  orders: {
    list: "/dashboard/orders",
    edit: (id: string) => `/dashboard/orders/${id}`,
  },
  dashboard: {
    overview: "/dashboard/overview",
    report: "/dashboard/report",
  },
  banner: {
    list: "/dashboard/banners",
    add: "/dashboard/banners/add",
    edit: (id: string) => `/dashboard/banners/${id}`,
  },
  collection: {
    list: "/dashboard/collections",
    add: "/dashboard/collections/add",
    edit: (id: string) => `/dashboard/collections/${id}`,
  },
  user: {
    list: "/dashboard/users",
    edit: (id: string) => `/dashboard/users/${id}`,
  },
};

export const BANK = {
  _userName: "DOAN GIA BAO",
  _bankName: "vietinbank",
  _id: "104877119056",
  _branch: "Thành phố Biên Hòa, Đồng Nai",
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
