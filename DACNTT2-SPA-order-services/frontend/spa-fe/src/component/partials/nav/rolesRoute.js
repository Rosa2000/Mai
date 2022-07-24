import React from "react";
// Tài khoản
import UserManagement from "../../userManagement/UserManagement";
// Quản lý sản phẩm
import ProductForm from "../../productManagement/ProductForm";
import ProductManagementList from "../../productManagement/ProductManagementList";
// Bán hàng
import AllProduct from "../../shopping/AllProducts";
import BodyCareProducts from "../../shopping/BodyCareProducts";
import SkinCareProducts from "../../shopping/SkinCareProducts";

// Đơn hàng
import ProductOrderList from "../../orderManagement/ProductOrderList";

// Dịch vụ
import CreateServiceForm from "../../serviceManagement/CreateServiceForm";
import ServiceManagement from "../../serviceManagement/ServiceManagement";
import BookingForm from "../../bookingService/BookingForm";

export const adminMenuItems = [
  {
    name: "Quản lý tài khoản",
    exact: true,
    to: `/users`,
    iconClassName: "bi bi-person-lines-fill",
    component: <UserManagement />,
  },
  {
    name: "Quản lý sản phẩm",
    exact: true,
    to: `/products/`,
    iconClassName: "bi bi-box-seam",
    subMenus: [
      {
        name: "Danh sách sản phẩm",
        to: "/products/",
        component: <ProductManagementList />,
      },
      {
        name: "Thêm sản phẩm mới",
        to: "/products/add-product",
        component: <ProductForm />,
      },
    ],
  },
  {
    name: "Mua bán sản phẩm",
    exact: true,
    to: `/shopping/`,
    iconClassName: "bi bi-bag",
    subMenus: [
      {
        name: "Tất cả mặt hàng",
        to: "/shopping/",
        component: <AllProduct />,
      },
      {
        name: "Chăm sóc da mặt",
        to: "/shopping/skin-care",
        component: <SkinCareProducts />,
      },
      {
        name: "Chăm sóc cơ thể",
        to: "/shopping/body-care",
        component: <BodyCareProducts />,
      },
      {
        name: "Chăm sóc tóc",
        to: "/shopping/hair-care",
        component: <BodyCareProducts />,
      },
    ],
  },
  {
    name: "Quản lý đơn hàng",
    exact: true,
    to: `/orders/products`,
    iconClassName: "bi bi-card-checklist",
    // component: <ProductOrderList />,
    subMenus: [
      {
        name: "Danh sách sản phẩm",
        to: "/orders/products",
        component: <ProductOrderList />,
      },
      // {
      //   name: "Thêm sản phẩm mới",
      //   to: "/products/services",
      //   component: <ProductForm />,
      // },
    ],
  },
  {
    name: "Quản lý dịch vụ",
    exact: true,
    to: `/services/`,
    iconClassName: "bi bi-flower2",
    subMenus: [
      {
        name: "Danh sách dịch vụ",
        to: "/services/",
        component: <ServiceManagement />,
      },
      {
        name: "Thêm dịch vụ mới",
        to: "/services/add-services",
        component: <CreateServiceForm />,
      },
    ],
  },
  {
    name: "Đặt lịch",
    exact: true,
    to: `/booking`,
    iconClassName: "bi bi-calendar-check",
    component: <BookingForm />,
  },
];
export const staffMenuItems = [
  {
    name: "Quản lý sản phẩm",
    exact: true,
    to: `/products/`,
    iconClassName: "bi bi-box-seam",
    subMenus: [
      {
        name: "Danh sách sản phẩm",
        to: "/products/",
        component: <ProductManagementList />,
      },
      {
        name: "Thêm sản phẩm mới",
        to: "/products/add-product",
        component: <ProductForm />,
      },
    ],
  },
  {
    name: "Mua bán sản phẩm",
    exact: true,
    to: `/shopping/`,
    iconClassName: "bi bi-bag",
    subMenus: [
      {
        name: "Tất cả mặt hàng",
        to: "/shopping/",
        component: <AllProduct />,
      },
      {
        name: "Chăm sóc da mặt",
        to: "/shopping/skin-care",
        component: <SkinCareProducts />,
      },
      {
        name: "Chăm sóc cơ thể",
        to: "/shopping/body-care",
        component: <BodyCareProducts />,
      },
      {
        name: "Chăm sóc tóc",
        to: "/shopping/hair-care",
        component: <BodyCareProducts />,
      },
    ],
  },
];

export const customerMenuItems = [
  {
    name: "Mua bán sản phẩm",
    exact: true,
    to: `/shopping/`,
    iconClassName: "bi bi-bag",
    subMenus: [
      {
        name: "Tất cả mặt hàng",
        to: "/shopping/",
        component: <AllProduct />,
      },
      {
        name: "Chăm sóc da mặt",
        to: "/shopping/skin-care",
        component: <SkinCareProducts />,
      },
      {
        name: "Chăm sóc cơ thể",
        to: "/shopping/body-care",
        component: <BodyCareProducts />,
      },
      {
        name: "Chăm sóc tóc",
        to: "/shopping/hair-care",
        component: <BodyCareProducts />,
      },
    ],
  },
];
