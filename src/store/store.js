import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "../redux/rootReducer";
import Api from "../services/Api";

const store = configureStore({
  reducer: {
    rootReducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Api.middleware),
});

const persistor = persistStore(store);

//action logout reset state

export { store, persistor };
