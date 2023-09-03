import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

//store calls reducers and state
// save our store so it will stay if we refresh for example
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk"; // for async ops

// reducers (we can only have one root reducer in store)
const reducer = combineReducers({
    user: userSlice, //from userslice.js
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath],
};

// persist the store

const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware], //thunk allows us to make async requests
});

export default store; //we integrate this store now into app

//this code sets up a place to store your app's important information (the store), 
//explains how to change it (reducers), ensures it's saved even if you close the app (persistence), 
//uses helpers for special tasks (middleware), and then makes this storage space available for your app to use.




