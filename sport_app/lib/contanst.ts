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

export const menus = [
  {
    title: "Dashboard",
    urls: [
      { url: PATH.dashboard.overview, text: "Tổng quan" },
      { url: PATH.dashboard.report, text: "Báo cáo" },
    ],
  },

  {
    title: "Người dùng",
    urls: [{ url: PATH.user.list, text: "Quản lý người dùng" }],
  },
  {
    title: "Đơn hàng",
    urls: [{ url: PATH.orders.list, text: "Quản lý đơn hàng" }],
  },
  {
    title: "Sản phẩm",
    urls: [
      { url: PATH.products.admin, text: "Quản lý sản phẩm" },
      { url: PATH.products.add, text: "Thêm sản phẩm" },
    ],
  },
  {
    title: "Danh mục",
    urls: [
      { url: PATH.categories.list, text: "Quản lý danh mục" },
      { url: PATH.categories.add, text: "Thêm danh mục" },
    ],
  },

  {
    title: "Banner ảnh",
    urls: [
      {
        url: PATH.banner.list,
        text: "Quản lý banners",
      },
      {
        url: PATH.banner.add,
        text: "Thêm banner ảnh",
      },
    ],
  },
  {
    title: "Bộ sưu tập",
    urls: [
      { url: PATH.collection.list, text: "Quản lý bộ sưu tập" },
      { url: PATH.collection.add, text: "Thêm bộ sưu tập" },
    ],
  },
];

export const BANK = {
  _userName: "DOAN GIA BAO",
  _bankName: "vietinbank",
  _id: "104877119056",
  _branch: "Thành phố Biên Hòa, Đồng Nai",
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
