import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

// 
export const CalendarPage = () => {
    const { user } = useAuthStore();
    const {openDateModal} = useUiStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
    // metodo 
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const isMyEvent = (user.uid === event.user._id ) || ( user.uid === event.user.uid );
        const style = {
            backgroundColor: isMyEvent ? '#7C2ED7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }
    // eventos
    const onDoubleClick = ( event ) => {
        console.log({doubleClick: event});
        openDateModal();
    }
    const onSelect = ( event ) => {
        console.log({click: event});
        setActiveEvent(event);
    }
    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event);
        setLastView( event )
    }
    // con un useEffect mandamos a llmar los eventos, sin dependecia, para que llame solo una vez.
    useEffect(() => {
      startLoadingEvents();
    }, [ ])
    
    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                eventPropGetter={eventStyleGetter}
                messages={getMessagesES()}
                // compinenete que renderiza cada compinente evento
                components={
                    {
                        event: CalendarEvent
                    }
                }
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}

            />
            <CalendarModal/>
            <FabAddNew />
            <FabDelete />
        </>

    )
}
