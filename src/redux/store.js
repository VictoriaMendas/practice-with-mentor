import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./global/slice";
import { logsSlice } from "./logs/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth/sllice";

// import { devToolsEnhancer } from "@redux-devtools/extension";

const globalConfig = {
  key: "global",
  storage,
  whitelist: ["themeTitle"],
};
const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
export const store = configureStore({
  reducer: {
    global: persistReducer(globalConfig, globalSlice.reducer),
    logs: logsSlice.reducer,
    auth: persistReducer(authConfig, authSlice.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
