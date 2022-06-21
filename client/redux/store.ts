import { configureStore } from "@reduxjs/toolkit";
import {userReducer,modalReducer,profileReducer} from "./slices";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'user',
    version: 1,
    storage,
  }
  const persistedUserReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
    reducer: {
        user:persistedUserReducer,
        modal:modalReducer,
        profile:profileReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store