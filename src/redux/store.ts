import {configureStore} from "@reduxjs/toolkit"
import miscSlice from "./reducers/misc"
import productSlice from "./reducers/productReducer"
import api from "./api/productApi"
import { cartReducer } from "./reducers/cartReducer"
import userApi from "./api/userApi"
import { userSlice } from "./reducers/userReducer"
import orderApi from "./api/orderApi"
import dashboard from "./api/dashboard"
const store = configureStore({
    reducer: {
        [miscSlice.name] : miscSlice.reducer,
        [productSlice.name] : productSlice.reducer,
        [cartReducer.name] : cartReducer.reducer,
        [api.reducerPath] : api.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer,
        [userSlice.name] : userSlice.reducer,
        [dashboard.reducerPath] : dashboard.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware,userApi.middleware,orderApi.middleware,dashboard.middleware),
})

export default store
