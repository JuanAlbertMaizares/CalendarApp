import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
// import {configureStore} from '@reduxjs/toolkit'; // restaurar code
import { uiSlice, calendarSlice } from './';


export const store = configureStore({
    // inicio borrador
    middleware: getDefaultMiddleware =>     
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    // fin de borrador
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    }
})