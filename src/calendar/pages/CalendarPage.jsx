import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';

// 
export const CalendarPage = () => {

    const {openDateModal} = useUiStore();
    const {events, setActiveEvent} = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
    const eventStyleGetter = ( event, start, end, isSelected ) => {
    
        const style = {
            backgroundColor: '#7C2ED7',
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
        </>

    )
}
