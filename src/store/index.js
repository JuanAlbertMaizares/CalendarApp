// el orden de las importaciones deben ser 
// primero los slices
// despues el store
// esto es, el store no puede llamar a algo que no se cargo aun.

// note: SLICES
export * from './auth/authSlice';
export * from './calendar/calendarSlice';
export * from './ui/uiSlice';


// note: STORE, que llama a los slices.
export * from './store';