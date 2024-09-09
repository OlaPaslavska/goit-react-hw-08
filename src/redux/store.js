import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "contacts",
  storage,
  whitelist: ["items"],
};
const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);
const rootReducer = combineReducers({
  contacts: persistedContactsReducer,
  filters: filtersReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
// export const store = configureStore({
//   reducer: rootReducer,
// });
export const persistor = persistStore(store);
