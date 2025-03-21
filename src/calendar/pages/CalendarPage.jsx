import { Calendar, Views } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"

import {addHours } from "date-fns"

import { Navbar, CalendarEvent, CalendarModal } from "../"

import { localizer, getMessagesEs } from '../../helpers';
import { useState } from 'react';
import { useUiStore,  useCalendarStore } from '../../hooks';
import { onCloseDateModal } from '../../store/ui/uiSlice';






export const CalendarPage = () => {

  //PARA VER EVENTOS
  const { events, setActiveEvent } = useCalendarStore();
  //PARA ABRIR EL MODAL
  const {openDateModal} = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem("lastView")||"week")

  // CAMBIO DE LENGUAJE
  const [lenguage, setLenguage] = useState(false);

  const onChangeLenguage = () => {
   setLenguage(current => !current); 
  }

  // CONFIGURACION PARA MANIPULAR BOTONES
  const [currentView, setCurrentView] = useState(Views.setLastView);
  const [currentDate, setCurrentDate] = useState(new Date());

  //CONSTANTE DEL CUADRO
  const eventStyleGetter = (event, start, end, isSelected) =>{ 

      const style = {
        backgroundColor: "#347CF7",
        borderRadius: "0px",
        opacity: 0.8,
        color: "white"
      }
      return {
        style
      }

      
  }

 

  const onDoubleClick = (event) => {
    // console.log({ doubleClick: event});
    openDateModal();
    onCloseDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }
  const onViewChanged = (event) => {
    setCurrentView( event )
    localStorage.setItem("lastView", event);
    setLastView( event)
  }


  return (
    <>
      <Navbar onChangeLenguage={ onChangeLenguage }/>

      <Calendar
        culture={lenguage && "es"}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={currentView}
        onView={onViewChanged}
        onNavigate={setCurrentDate}
        defaultView={lastView}
        style={{ height: "calc(100vh - 80px)", width: "100%" }}
        messages={lenguage && getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}  
      />
      <CalendarModal/>
    </>
  )
}
