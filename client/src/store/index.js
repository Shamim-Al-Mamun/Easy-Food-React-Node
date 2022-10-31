import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authServices from "./services/authServices";
import uploadServices from "./services/authServices";
import authReducer from "./reducers/authSlice";
import drawerReducer from "./reducers/drawerSlice";
import cartReducer from "./reducers/cartSlice";
import userServices from "./services/userServices";
import productServices from "./services/productServices";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const Store = configureStore({
  reducer: {
    [authServices.reducerPath]: authServices.reducer,
    [userServices.reducerPath]: userServices.reducer,
    [uploadServices.reducerPath]: uploadServices.reducer,
    [productServices.reducerPath]: productServices.reducer,
    auth: authReducer,
    drawer: drawerReducer,
    cart: persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authServices.middleware,
      uploadServices.middleware,
      userServices.middleware,
      productServices.middleware,
    ]),
});

export default Store;
