import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { categoryServicesApi } from '../service/categoryServices'
import { productServicesApi } from '../service/productServices';
import { loginServicesApi } from '../service/loginService';
import { roughServicesApi } from '../service/roughServices';
import { adminServiceApi } from '../service/adminService';

export const store = configureStore({
    reducer: {
        [productServicesApi.reducerPath] : productServicesApi.reducer,
        [loginServicesApi.reducerPath] : loginServicesApi.reducer,
        [categoryServicesApi.reducerPath] : categoryServicesApi.reducer,

        [roughServicesApi.reducerPath] : roughServicesApi.reducer,
        [adminServiceApi.reducerPath] : adminServiceApi.reducer
    },

     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productServicesApi.middleware,
            loginServicesApi.middleware,
            categoryServicesApi.middleware,

            roughServicesApi.middleware,
            adminServiceApi.middleware
        ),
})

setupListeners(store.dispatch)