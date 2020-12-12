import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";

export default function Application(props) {

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
    },
    {
      id: 4,
      time: "3pm",
      interview: {
        student: "Jeremy Dombrowski",
        interviewer: {
          id: 2,
          name: "Tori Malcolm",
          avatar: "https://i.imgur.com/Nmx0Qxo.png",
        }
      }
    },
    {
      id: 6,
      time: "5pm",
      interview: {
        student: "Adam Thorne",
        interviewer: {
          id: 5,
          name: "Sven Jones",
          avatar: "https://i.imgur.com/twYrpay.jpg",
        }
      }
    },
    {
      id: 7,
      time: "6pm",
    },
    {
      id: 8 ,
      time: "7pm",
    },
  ];

  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    axios.get('http://felix-ux32vd:8001/api/days')
      .then((response) => {
        setDays(response.data)
    })
  }, []);

  const appointmentList = function (appointments) {
    return appointments.map(appointment => {
      return (
        <Appointment key={appointment.id} {...appointment} />
      );
    });
  };

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={ days } day={ day } setDay={ setDay } />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointmentList(appointments)}
        <Appointment key="last" time="8pm" />
      </section>
    </main>
  );
}
