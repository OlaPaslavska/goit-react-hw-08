import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import contactsReducer from "./contacts/slice";
import filtersReducer from "./filters/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
  filters: filtersReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/register/fulfilled",
          "auth/login/fulfilled",
          "auth/logOut/fulfilled",
          "auth/refreshUser/fulfilled",
        ],
        ignoredPaths: ["auth.token"],
      },
    }),
});

export const persistor = persistStore(store);
