import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store";
// note: HOOK COMPONENT que consume la data en el STORE y la suministra junto con metodos de su slice.
export const useCalendarStore = () => {
    // cargamos el disparador de redux
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector( state => state.calendar );

    // METODO para setear un evento como principal en pantalla
    const setActiveEvent = ( calendarEvent ) => { // calendarEvent: 
        dispatch(onSetActiveEvent(calendarEvent));
    }
    
    return {
        // note: props
        events,
        activeEvent,
        // note: metodos
        setActiveEvent,
    }
}
