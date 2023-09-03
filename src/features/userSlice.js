import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

//State management
//https://redux-toolkit.js.org/api/createSlice

//how are certain changes in state handled here

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: { //Reducers handle state change in response to actions
        addNotifications: (state, { payload }) => { //here we check if a notification already exists, if so then ++, if not then make a new one.
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => { //Removes count and sets it back to no notifications
            delete state.newMessages[payload];
        },
        //potential to add more
    },

    extraReducers: (builder) => { //extra reducers are for when async api calls end up changing the state
        // After usersignup, save this
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload); //matchFullfiled is when the action succeeds
        // After login, save this
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload); //Basically the information returned by the api becomes the new state of userSLice
        // After logout, set all back to null
        //Essentially we are returned an action when the api call succeeds, and from that we destructure it and remove payload specifically as it contains the data returned by the api call.
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
        //potential to add more 
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions; //actions are used to change state. If more reducers added in the future, add them here.
export default userSlice.reducer;