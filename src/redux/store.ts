import {configureStore} from "@reduxjs/toolkit"
import miscSlice from "./reducers/misc"
import productSlice from "./reducers/productReducer"
import api from "./api/productApi"
import { cartReducer } from "./reducers/cartReducer"
import userApi from "./api/userApi"
import { userSlice } from "./reducers/userReducer"

const store = configureStore({
    reducer: {
        [miscSlice.name] : miscSlice.reducer,
        [productSlice.name] : productSlice.reducer,
        [cartReducer.name] : cartReducer.reducer,
        [api.reducerPath] : api.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [userSlice.name] : userSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware,userApi.middleware),
})

export default store
