import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: true
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true
            state.loading = false
        },
        userNotExist: (state) => {
            state.user = {};
            state.isAuthenticated = false
            state.loading = false
        }
    },
});
export const { userExist, userNotExist } = userSlice.actions;
export default userSlice.reducer;
