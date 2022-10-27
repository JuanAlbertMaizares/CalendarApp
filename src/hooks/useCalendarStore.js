import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";


// note: HOOK COMPONENT que consume la data del backend y la coloca en el STORE con metodos de su slice.
export const useCalendarStore = () => {
    // cargamos el disparador de redux
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
    
    // mtd: METODO para setear un evento como principal en pantalla
    const setActiveEvent = ( calendarEvent ) => { // calendarEvent: 
        dispatch(onSetActiveEvent(calendarEvent));
    }
    // mtd: persiste datos a mongo y tambien los coloca en el store
    const startSavingEvent = async( calendarEvent ) => {

        try {
            // primero consulta pre-existencia para solo actualizar evento.
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id }`, calendarEvent );
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            }  
            // persiste la data en backend, mongo
            const {data} = await calendarApi.post('/events', calendarEvent );
            // la coloca en el store para consumo del front-end
            dispatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user } ));
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar evento.', error.response.data.msg, 'error');
        }


         
    }
    // mtd: persiste datos a mongo y tambien los coloca en el store
    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }
    // mtd: persiste datos a mongo y tambien los coloca en el store
    const startLoadingEvents = async() => {
        try {
            // obtenemos los eventos del backend
            const { data } = await calendarApi.get('/events');
            // convertirmos el formato de las fechas
            const events = convertEventsToDateEvents( data.eventos );
            // mandamos esos eventos al store.
            dispatch( onLoadEvents( events ));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        // note: props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent?._id,
        // note: metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
