import {configureStore} from "@reduxjs/toolkit"
import miscSlice from "./reducers/misc"
import productSlice from "./reducers/productReducer"
import api from "./api/productApi"

const store = configureStore({
    reducer: {
        [miscSlice.name] : miscSlice.reducer,
        [productSlice.name] : productSlice.reducer,
        [api.reducerPath] : api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export default store
