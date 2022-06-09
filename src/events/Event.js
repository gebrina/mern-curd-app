import { useState,useEffect } from 'react';
import clock from '../assets/images/clock.png';
import eventImage from '../assets/images/event.png';
import calendar from '../assets/images/calendar.png';
import './Event.css';
import axios  from 'axios';
import events from '../assets/images/events.jpg'
const Event  = () =>{
    const [isLoaded,setIsLoaded] = useState(false)
    const [eventsData,setEventsData] = useState([]);
    const [eventTime , setEventTime] = useState('');
    const [time,setTime] = useState('');
    const [date,setDate] = useState('')
    const getAllEvents = async () =>{
       try {
        const respose = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
         setEventsData(respose.data.data)
        setIsLoaded(true)
       } catch (error) {
         console.log(error)   
       }
    }
    
    useEffect(()=>{
     const callEvents = async () =>{
          await getAllEvents()
     }

     callEvents();
     return ()=>{
         setIsLoaded(false)
     }
    },[])
     return <>
     <div className='title-div'>
         <h1 className='event-title'>MERN CRUD ||Event</h1>
     </div>
     <section 
      style={{
          backgroundImage:`url(${events})`,
          backgroundRepeat : 'no-repeat',
          backgroundPosition: 'center',
          backgroundBlendMode:'difference',
          filter:'revert-layer',
          backgroundSize :' cover'
      }}
     className="event-section">
            <div className="">
                <form className='event-form'>
                    <div className='form-group'>
                      <input id="event-name" 
                       placeholder='Insert z event...'
                      type="text"/>
                      </div>

                       <div className='form-group'>
                       <input id="event-time" 
                       placeholder='Insert z time...'
                      type="text"/>
                       </div>

                     <div className='form-group'>
                     <input id="event-date" 
                       placeholder='Insert z date...'
                      type="text"/>
                     </div>
                    
                     <button type='submit'>Save</button>
                </form>
            </div>
       </section>
      {isLoaded? <div className='events-card'>
          {eventsData.length>0?
          eventsData.map((event,index)=>{
              return  <div key={index} className='event-card'>
              <div className='event-title'>
                <img  width={100} src={eventImage} 
                alt="Event Name"/>
                <h2>{event.eventName}</h2>
                </div>
               <div className='event-time'>
                   <img width={100} src={clock} alt="Event Time"/>
                   <h2>{event.time}</h2>
               </div>
               <div className='event-date'>
                   <img  width={100} src={calendar} alt="Event Date"/>
                   <div>{event.date.length<7?<h2>{event.date}</h2>:<h2>{event.date?.substring(0,7)}</h2>}</div>
               </div>
          </div>
          }):<p className='display-4 text-center'>
              No Events 2 B Displayed
              </p>}
       </div>
      : <div class="loader"></div>}
       </>
}

export default Event;