import {configureStore} from "@reduxjs/toolkit"
import miscSlice from "./reducers/misc"

const store = configureStore({
    reducer: {
        [miscSlice.name] : miscSlice.reducer
    },
})

export default store
