import { configureStore } from "@reduxjs/toolkit";
import { footballApi } from "./footballApi";

export function makeStore() {
  return configureStore({
    reducer: {
      [footballApi.reducerPath]: footballApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(footballApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
