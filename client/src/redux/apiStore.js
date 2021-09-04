import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { nodeApi } from "../services/nodeApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducer from "./userSlice";
import valueReducer from "./valueSlice";
import indexReducer from "./indexSlice";
import arrReducer from "./arrSlice";
import colorReducer from "./colorSlice";


const reducers = combineReducers({
  [nodeApi.reducerPath]: nodeApi.reducer,
  user: userReducer,
  val: valueReducer,
  ind: indexReducer,
  arr: arrReducer,
  col: colorReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["nodeApi"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const apiStore = configureStore({
  reducer: persistedReducer,

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nodeApi.middleware),
});

setupListeners(apiStore.dispatch);