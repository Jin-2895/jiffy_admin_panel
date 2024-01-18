import axios from "axios";
import { NotificationManager } from "react-notifications";
import Domain from "lib/Config";
import History from "@history";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_ERROR = "PRODUCT_ERROR";
export const GET_CATEGORY = "GET_CATEGORY";
export const ADD_PRODUCT = "GET_PRODUCT";
export const ADD_PRODUCT_RESET = "ADD_PRODUCT_RESET";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID";
export const GET_CATEGORY_BY_ID_ERROR = "GET_CATEGORY_BY_ID_ERROR";

export function productLoading(value) {
  return (dispatch) => {
    return dispatch({
      type: PRODUCT_LOADING,
      payload: value,
    });
  };
}

export function getProducts(variables) {
  if (variables.page) {
    --variables.page;
  }
  const request = axios.post(`${Domain}/api/product/view`, {
    ...variables,
    limit: 15,
  });
  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: GET_PRODUCTS,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        dispatch(productLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Cannot fetch products");
      });
}

export function deleteProduct(productId, variables) {
  const request = axios.put(`${Domain}/api/product/delete/${productId}`);
  return (dispatch) =>
    request
      .then((response) => {
        dispatch(getProducts(variables));
      })
      .catch((error) => {
        dispatch(productLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Cannot delete product");
      });
}

export function getCategory(variables = null) {
  let request;
  if (!variables) {
    request = axios.post(`${Domain}/api/product/category/view`);
  } else {
    if (variables.page) {
      --variables.page;
    }
    request = axios.post(`${Domain}/api/product/category/view`, {
      ...variables,
      limit: 10,
    });
  }

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: GET_CATEGORY,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        dispatch(productLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Cannot fetch category");
      });
}

export const addProduct = (product) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(
      `${Domain}/api/product/add`,
      product,
      config
    );
    if (data.statusCode === 200) {
      NotificationManager.success("Product Added successfully", "Success");
    }
    History.push("/admin/products");
  } catch (error) {
    dispatch(productLoading(false));
    error.response
      ? NotificationManager.error(error.response.message)
      : NotificationManager.error("Error! Product not added");
  }
};

export function deleteCategory(categoryID, variables) {
  const request = axios.put(
    `${Domain}/api/product/category/delete/${categoryID}`
  );
  return (dispatch) =>
    request
      .then((response) => {
        dispatch(getCategory(variables));
      })
      .catch((error) => {
        dispatch(productLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Cannot Delete Category");
      });
}

export function addCategory(data) {
  const request = axios.post(`${Domain}/api/product/category/add`, data);
  return (dispatch) => {
    request
      .then((response) => {
        if (response.data.statusCode === 200) {
          NotificationManager.success("Category Added successfully", "Success");
        }
        History.push("/admin/category");
      })
      .catch((error) => {
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Cannont Add Category");
      });
  };
}

export function getProductById(id) {
  const request = axios.get(`${Domain}/api/product/view/${id}`);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_BY_ID,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_LOADING,
          payload: true,
        });
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Product not found");
      });
  };
}

export function updateProduct(id, product) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const request = axios.put(
    `${Domain}/api/product/update/${id}`,
    product,
    config
  );
  return (dispatch) => {
    request
      .then((response) => {
        NotificationManager.success("Product Updated successfully", "Success");
        History.push("/admin/products");
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_LOADING,
          payload: false,
        });
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Product not found");
      });
  };
}

export function getCategoryById(id) {
  const request = axios.get(`${Domain}/api/product/category/view/${id}`);
  return (dispatch) => {
    request
      .then((response) => {
        dispatch({
          type: GET_CATEGORY_BY_ID,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_CATEGORY_BY_ID_ERROR,
          payload: error.response.data.message,
        });
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Product not found");
      });
  };
}

export function updateCategory(id, categoryData) {
  const request = axios.put(
    `${Domain}/api/product/category/update/${id}`,
    categoryData
  );

  return (dispatch) => {
    request
      .then((response) => {
        NotificationManager.success("Category Updated Successfully", "Success");
        History.push("/admin/category");
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_LOADING,
          payload: false,
        });
        error.response
          ? NotificationManager.error(error.response.data.message)
          : NotificationManager.error("Error! Category not found");
      });
  };
}
