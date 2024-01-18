// import Domain from "lib/Config";
// import axios from "axios";
// import { NotificationManager } from "react-notifications";
// import history from "@history.js";
// export const GET_PRODUCTCOMMENTS = "[APP] GET_PRODUCTCOMMENTS";
// export const GET_ADMIN_PRODUCTS = "[ADMIN] GET_ADMIN_PRODUCTS";
// export const ADMIN_PRODUCT_LOADING = "[ADMIN] ADMIN_PRODUCT_LOADING";
// export const ADMIN_PRODUCTDETAIL = "[ADMIN] ADMIN_PRODUCTDETAIL";
// export const ADMIN_PRODDETAIL_LOADING = "[ADMIN] ADMIN_PRODDETAIL_LOADING";
// export const ADMIN_PRODUCT_UPDATE = "[ADMIN] ADMIN_PRODUCT_UPDATE";
// export const PRODUCT_IMAGE_DELETE = "[ADMIN] PRODUCT_IMAGE_DELETE";
// export const ADMIN_PRODUCT_DELETE = "[ADMIN] ADMIN_PRODUCT_DELETE";
// export const ADMIN_ADD_PRODUCT = "[ADMIN] ADMIN_ADD_PRODUCT";
// export const GENERAL_LOADING = "[ADMIN] GENERAL_LOADING";

// export function getProductComments(id) {
//   const request = axios.get(`${Domain}/api/buyer/getProductComments`, {
//     params: { id },
//   });

//   return (dispatch) =>
//     request.then((response) => {
//       return dispatch({
//         type: GET_PRODUCTCOMMENTS,
//         payload: response.data.comments,
//       });
//     });
// }

// export function adminProductLoading(val) {
//   return (dispatch) => {
//     return dispatch({
//       type: ADMIN_PRODUCT_LOADING,
//       payload: val,
//     });
//   };
// }

// // getAdminProducts implemented
// // export function getAdminProducts(page, sorting, searchData, artType) {
// //   const request = axios.post(
// //     `${Domain}/api/product/view`,
// //     { sorting, searchData, artType },
// //     {
// //       params: { page },
// //     }
// //   );

// //   return (dispatch) =>
// //     request
// //       .then((response) => {
// //         return dispatch({
// //           type: GET_ADMIN_PRODUCTS,
// //           payload: response.data.result,
// //         });
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         dispatch(adminProductLoading(false));
// //         error.response
// //           ? NotificationManager.error(error.response.data.msg)
// //           : NotificationManager.error("Error! Cannot fetch products");
// //       });
// // }

// export function getAdminProducts() {
//   const request = axios.post(`${Domain}/api/product/view`, {
//     page: 1,
//     limit: 5,
//   });

//   return (dispatch) =>
//     request
//       .then((response) => {
//         return dispatch({
//           type: GET_ADMIN_PRODUCTS,
//           payload: response.data.result.rows,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(adminProductLoading(false));
//         error.response
//           ? NotificationManager.error(error.response.data.msg)
//           : NotificationManager.error("Error! Cannot fetch products");
//       });
// }

// export function adminProdByCat(data) {
//   const request = axios.post(
//     `${Domain}/api/admin/getAdminProducts/category`,
//     data
//   );

//   return (dispatch) =>
//     request
//       .then((response) => {
//         return dispatch({
//           type: GET_ADMIN_PRODUCTS,
//           payload: response.data.result,
//         });
//       })
//       .catch((error) => console.log(error));
// }

// export function adminProdDetailLoading(val) {
//   return (dispatch) => {
//     return dispatch({
//       type: ADMIN_PRODDETAIL_LOADING,
//       payload: val,
//     });
//   };
// }

// export function adminProductDetail(id) {
//   const request = axios.get(`${Domain}/api/admin/adminProductDetail`, {
//     params: { id },
//   });

//   return (dispatch) =>
//     request.then((response) => {
//       return dispatch({
//         type: ADMIN_PRODUCTDETAIL,
//         payload: response.data.product,
//       });
//     });
// }
// export function adminProductUpdate(data) {
//   const request = axios.put(`${Domain}/api/admin/updateProduct`, data);

//   return (dispatch) =>
//     request
//       .then((response) => {
//         return dispatch({
//           type: ADMIN_PRODUCT_UPDATE,
//         });
//       })
//       .then(() => dispatch(adminGeneralLoading(false)))
//       .then(() => history.push({ pathname: "/admin/products" }))
//       .catch((error) => {
//         dispatch(adminGeneralLoading(false));
//         error.response
//           ? NotificationManager.error(error.response.data.msg)
//           : NotificationManager.error("Failed to update");
//       });
// }
// export function deleteProductImage(data) {
//   const request = axios.post(`${Domain}/api/admin/deleteProductImage`, data);

//   return (dispatch) =>
//     request
//       .then((response) => {
//         return dispatch({
//           type: PRODUCT_IMAGE_DELETE,
//         });
//       })
//       .then(() => dispatch(adminProductDetail(data.productId)))
//       .catch((error) => {
//         console.log(error);
//       });
// }
// export function deleteProduct(id) {
//   const request = axios.delete(`${Domain}/api/admin/deleteProduct`, {
//     params: { id },
//   });

//   return (dispatch) =>
//     request
//       .then((response) => {
//         return dispatch({
//           type: ADMIN_PRODUCT_DELETE,
//         });
//       })
//       .then(() => dispatch(getAdminProducts(0)))
//       .catch((error) => {
//         console.log(error);
//       });
// }

// export function addNewProduct(data) {
//   const request = axios.post(`${Domain}/api/admin/addProduct`, data);

//   return (dispatch) =>
//     request
//       .then((response) => {
//         return dispatch({
//           type: ADMIN_ADD_PRODUCT,
//         });
//       })
//       .then(() => dispatch(adminGeneralLoading(false)))
//       .then(() => NotificationManager.success("Product created successfullt!"))
//       .catch((error) => {
//         dispatch(adminGeneralLoading(false));
//         error.response
//           ? NotificationManager.error(error.response.data.msg)
//           : NotificationManager.error("Failed to add product");
//       });
// }

// export function adminGeneralLoading(val) {
//   return (dispatch) => {
//     return dispatch({
//       type: GENERAL_LOADING,
//       payload: val,
//     });
//   };
// }
