import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


// note: HOOK COMPONENT que consume la data en el STORE y la suministra junto con metodos de su slice.
export const useCalendarStore = () => {
    // cargamos el disparador de redux
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    
    // METODO para setear un evento como principal en pantalla
    const setActiveEvent = ( calendarEvent ) => { // calendarEvent: 
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async( calendarEvent ) => {

        if (calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}));
        } else {
            const {data} = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user } ));
        }
    }
    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }
    return {
        // note: props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?._id,
        // note: metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
