import * as Actions from "../actions";
// import { productLoading } from "../actions";

const initialState = {
  loading: false,
  productDetail: {},
  productList: [],
  categoryList: [],
  categoryDetail: {},
  totalProducts: null,
  error: null,
};

const productReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.PRODUCT_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Actions.PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case Actions.GET_PRODUCTS: {
      let resFormattedMapped = [];
      let totalProducts;
      if (action.payload) {
        let res = action.payload;
        totalProducts = res.count;
        resFormattedMapped = res.rows.map((inv) => ({
          id: inv.id,
          title: inv.title,
          isDeleted: inv.isDeleted,
          active: inv.active,
          rating: inv.ratings,
          discount: inv.discount,
          unitQuantity: inv.unitQuantity,
          quantity: inv.quantity,
          productImages: inv.productImages[0].url,
          description: inv.description,
          price: inv.price,
          categoryId: inv.categoryId,
        }));
      }
      return {
        ...state,
        loading: false,
        productList: resFormattedMapped,
        totalProducts,
      };
    }

    case Actions.GET_CATEGORY:
      const totalCategories = action.payload.count;
      return {
        ...state,
        categoryList: action.payload.rows,
        totalCategories,
        loading: false,
      };

    case Actions.GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
        loading: false,
      };

    case Actions.GET_CATEGORY_BY_ID:
      return {
        ...state,
        categoryDetail: action.payload,
        loading: false,
      };

    case Actions.GET_CATEGORY_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default: {
      return state;
    }
  }
};
export default productReducer;
