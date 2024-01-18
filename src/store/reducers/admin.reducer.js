import * as Actions from "../actions";
import moment from "moment";

const initialState = {
  AdminProducts: {
    Loading: false,
    productList: null,
    totalProducts: null,
  },
  AdminProdDetail: {
    Loading: false,
    details: null,
  },
  productComments: [],
  Orders: {
    Loading: false,
    rows: null,
    totalOrders: null,
    error: null,
  },
  OrderDetails: {
    Loading: false,
    details: null,
  },
  TaxData: {
    Loading: false,
    tax: null,
  },
  BusinessFraming: {
    Loading: false,
    rows: null,
    total: null,
    error: null,
    detail: null,
  },
  ArtistFraming: {
    Loading: false,
    rows: null,
    total: null,
    error: null,
    detail: null,
  },
  GalleryWall: {
    Loading: false,
    rows: null,
    total: null,
    error: null,
    detail: null,
  },
  FramePrices: {
    Loading: false,
    rows: null,
    error: null,
  },
  Coupons: {
    Loading: false,
    rows: null,
    totalCoupons: null,
  },
  GiftCards: {
    Loading: false,
    rows: null,
    totalGiftCards: null,
  },
  SendGridTemplates: {
    Loading: false,
    templates: null,
    errors: null,
  },
  Blogs: {
    Loading: false,
    error: null,
    total: null,
    rows: null,
    detail: null,
  },
  OrderCountGraph: {
    Loading: false,
    day: null,
    month: null,
    customerData: null,
  },
  OrderPieGraph: {
    Loading: false,
    labels: null,
    totalOrders: null,
    data: null,
    countByStatus: null,
    recentOrders: null,
  },
};

const adminReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.PRICES_LOADING: {
      return {
        ...state,
        FramePrices: {
          ...state.FramePrices,
          Loading: action.payload,
        },
      };
    }
    case Actions.PRICES_ERROR: {
      return {
        ...state,
        FramePrices: {
          Loading: false,
          error: action.payload,
          rows: null,
        },
      };
    }

    case Actions.GET_ORDERS_ADMIN: {
      let totalOrders;
      let rows = [];
      if (action.payload) {
        let res = action.payload;
        totalOrders = res.count;
        rows = res.rows.map((idx) => ({
          customer_id: idx.customer_id,
          id: idx.id,
          fullName: `${idx.firstName} ${idx.lastName}`,
          discountedPrice: idx.discountedPrice,
          taxIncPrice: idx.taxIncPrice,
          tax: idx.tax,
          email: idx.email,
          phone: idx.phone,
          orderType: idx.orderType,
          deliveryAddress: idx.deliveryAddress,
          state: idx.state,
          walletDeduction: idx.walletDeduction,
          createdAt: moment(idx.createdAt).format("MMM DD YYYY h:mm A"),
        }));
      }
      return {
        ...state,
        Orders: { totalOrders, rows, Loading: false, error: null },
      };
    }
    case Actions.ADMIN_ORDER_LOADING: {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          Loading: action.payload,
        },
      };
    }
    case Actions.ADMIN_ORDER_ERROR: {
      return {
        ...state,
        Orders: {
          Loading: false,
          error: action.payload,
          rows: null,
          totalOrders: null,
        },
      };
    }
    case Actions.ORDERS_DETAIL_ADMIN: {
      return {
        ...state,
        OrderDetails: {
          Loading: false,
          details: action.payload,
        },
      };
    }
    case Actions.ORDER_DETAIL_LOADING: {
      return {
        ...state,
        OrderDetails: {
          ...state.OrderDetails,
          Loading: action.payload,
        },
      };
    }

    // case Actions.GET_ADMIN_PRODUCTS: {
    //   let resFormattedMapped = [];
    //   let totalProducts;
    //   if (action.payload) {
    //     let res = action.payload;
    //     console.log(res);
    //     totalProducts = res.count;
    //     resFormattedMapped = res.rows.map((inv) => ({
    //       id: inv.id,
    //       name: inv.name,
    //       artType: inv.artType,
    //       recommended: inv.recommended,
    //       deleted: inv.deleted,
    //       active: inv.active,
    //       rating: inv.ratings,
    //       picture: inv.productimages[0].image,
    //     }));
    //   }
    //   return {
    //     ...state,
    //     AdminProducts: {
    //       Loading: false,
    //       rows: resFormattedMapped,
    //       totalProducts,
    //     },
    //   };
    // }

    case Actions.GET_ADMIN_PRODUCTS: {
      let resFormattedMapped = [];
      let totalProducts;
      if (action.payload) {
        let res = action.payload;
        totalProducts = res.length;
        resFormattedMapped = res.map((inv) => ({
          id: inv.id,
          title: inv.title,
          isDeleted: inv.isDeleted,
          active: inv.active,
          rating: inv.ratings,
          productimages: inv.productimages,
          description: inv.description,
          price: inv.price,
        }));
      }
      return {
        ...state,
        AdminProducts: {
          Loading: false,
          productList: resFormattedMapped,
          totalProducts,
        },
      };
    }
    case Actions.ADMIN_PRODUCT_LOADING: {
      if (action.payload) {
        return {
          ...state,
          AdminProducts: {
            ...state.AdminProducts,
            Loading: action.payload,
          },
        };
      } else return state;
    }
    case Actions.ADMIN_PRODUCTDETAIL: {
      let resFormattedMapped = {};
      if (action.payload) {
        let product = action.payload;
        resFormattedMapped = {
          id: product.id,
          name: product.name,
          moulding: product.moulding,
          color: product.color,
          mouldingSize: product.mouldingSize,
          artType: product.artType,
          active: product.active,
          recommended: product.recommended,
          shortDescription: product.shortDescription,
          details: product.details,
          pictures: product.productimages.map((pix) => ({
            id: pix.id,
            image: pix.image,
          })),
          createdAt: moment(product.createdAt).format("MMM DD YYYY h:mm A"),
        };
      }
      return {
        ...state,
        AdminProdDetail: {
          Loading: false,
          details: resFormattedMapped,
        },
      };
    }
    case Actions.ADMIN_PRODDETAIL_LOADING: {
      if (action.payload) {
        return {
          ...state,
          AdminProdDetail: {
            ...state.AdminProdDetail,
            Loading: action.payload,
          },
        };
      } else return state;
    }
    default: {
      return state;
    }
  }
};

export default adminReducer;
