import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const currentDayAppointments = getAppointmentsForDay(state, state.day)
  const schedule = currentDayAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    )
  })


  const setDay = day => setState(prev => ({ ...prev, day }));
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('http://felix-ux32vd:8001/api/days'),
      axios.get('http://felix-ux32vd:8001/api/appointments'),
      axios.get('http://felix-ux32vd:8001/api/interviewers')
    ]).then((result) => {
      setState((prev) => ({ ...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data }))
    })
  }, [state.day]);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={ state.days } day={ state.day } setDay={ setDay } />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="" />
      </section>
    </main>
  );
}
