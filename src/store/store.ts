import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/app-slice";

const store = configureStore({
    reducer: {
        app: appReducer,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
