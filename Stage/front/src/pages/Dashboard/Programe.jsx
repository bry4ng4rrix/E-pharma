import Sidebar from "../../components/SideNav/Sidebard";
import { useState, useEffect } from "react";
import Fixednav from '../../components/SideNav/Fixednav';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import fr from 'date-fns/locale/fr';

const Programe = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => setDarkMode(!darkMode);

  const [rendezvous, setRendezvous] = useState([]);

  const fetchRendezvous = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/rendevous', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const fetchedEvents = responseData.map((r) => ({
        title: r.message,
        start: new Date(r.date),
        end: new Date(r.date),
      }));

      setRendezvous(fetchedEvents);
    } catch (error) {
      console.error('Error fetching rendezvous:', error);
    }
  }

  useEffect(() => {
    fetchRendezvous();
  }, []);

  const locales = { 'fr': fr };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  });

  return (
    <section className={`${darkMode ? 'dark' : ''} flex gap-1 bg-vertblanc bg-gradient-to-bl from-green-500 to-cyan-400`}>
      <Sidebar />

      <div className="m-3 text-xl font-semibold w-full rounded-lg bg-vertblanc shadow-lg bg-opacity-80 dark:bg-fonddark dark:text-green-100 transition-colors">
        <Fixednav toggleDark={toggleDark} darkMode={darkMode} />

        <div className="bg-white mx-5 rounded p-3 ">
          <div style={{ height: '500px' }} 
              className="text-sm">
            <Calendar
              localizer={localizer}
              events={rendezvous} 
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default Programe;
