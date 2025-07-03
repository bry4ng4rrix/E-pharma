import Sidebar from "../../components/SideNav/Sidebard";
import { useState } from "react";
import Fixednav from '../../components/SideNav/Fixednav'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { format, parse, startOfWeek, getDay } from 'date-fns';
// import fr from 'date-fns/locale/fr';

const Programe = () => {
        const [darkMode,setDarkMode] = useState(false);
    const toogleDark = () =>{
        setDarkMode(!darkMode)

    }

    // const locales = {
    //   'fr': fr,
    // };
    // const localizer = dateFnsLocalizer({
    //   format,
    //   parse,
    //   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    //   getDay,
    //   locales,
    // });

    // const events = [
    //   {
    //     title: 'Consultation',
    //     start: new Date(2025, 6, 3, 10, 0),
    //     end: new Date(2025, 6, 3, 11, 0),
    //   },
    //   {
    //     title: 'Rendez-vous',
    //     start: new Date(2025, 6, 4),
    //     end: new Date(2025, 6, 4),
    //   },
    // ];

    return (
      
       <section className={` ${darkMode &&'dark'} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>

          
            
          
              {/* sidebard */}
              <Sidebar />  
              
              {/* navbar */}

                   {/* contenue */}
            <div className=" m-3 text-xl  font-semibold  w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
               
                <Fixednav toogleDark={toogleDark} darkMode={darkMode}/>
                

                <div className="bg-white mx-5 rounded  p-3 h-screen ">
               <FullCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  weekends={false}
  events={[
    { title: 'event 1', date: '2025-07-03' },
    { title: 'event 2', date: '2019-04-02' }
  ]}
/>
                    {/* calnedar */}
                    {/* <div style={{ height: '400px' }}>
                      <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
    
                        style={{ height: 500 }}
                        messages={{
                          next: 'Suivant',
                          previous: 'Précédent',
                          today: "Aujourd'hui",
                          month: 'Mois',
                          week: 'Semaine',
                          day: 'Jour',
                          agenda: 'Agenda',
                        }}
                        culture="fr"
                      />
                    </div> */}
                    {/* endcalendar */}
                </div>
            </div>
            
                
              
        </section>
          )
}

export default Programe 