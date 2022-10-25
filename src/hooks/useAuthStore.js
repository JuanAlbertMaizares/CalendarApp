// encargado de realizar las interaccion con el auth en el store.

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";



export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        try {
            // mandamos un post al endpoint, mandando tambien el objeto de parametros.
            const resp = await calendarApi.post('/auth', { email, password });
            console.log({  resp  });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        errorMessage,
        status,
        user,
        
        startLogin
    }
}