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

// import { devToolsEnhancer } from "@redux-devtools/extension";
const logsConfig = {
  key: "logs",
  storage,
  whitelist: ["items"],
};
const globalConfig = {
  key: "global",
  storage,
  whitelist: ["themeTitle"],
};
export const store = configureStore({
  reducer: {
    global: persistReducer(globalConfig, globalSlice.reducer),
    logs: persistReducer(logsConfig, logsSlice.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
