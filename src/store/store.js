import {configureStore} from '@reduxjs/toolkit';
// import {configureStore} from '@reduxjs/toolkit'; // restaurar code
import { uiSlice, calendarSlice, authSlice } from './';


export const store = configureStore({
    // inicio borrador
    middleware: getDefaultMiddleware =>     
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    // fin de borrador
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,

    }
})