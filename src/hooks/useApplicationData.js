import { useState, useEffect } from "react";
import axios from "axios";

const HOST = 'http://felix-ux32vd:8001';
/*
State object will maintain the same structure.
SetDay action can be used to set the current day.
BookInterview action makes an HTTP request and updates the local state.
CancelInterview action makes an HTTP request and updates the local state.
 */
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(HOST + '/api/days'),
      axios.get(HOST + '/api/appointments'),
      axios.get(HOST + '/api/interviewers')
    ]).then((result) => {
      setState((prev) => ({ ...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data }))
    })
  }, [state.day]);

  function setDay(day) {
    setState(prev => ({ ...prev, day }))
  }

  function bookInterview(id, interview) {
    console.log(`id: ${id} interview: `, interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    if(!interview.student || !interview.interviewer) return Promise.reject(console.log(`ERROR: NULL INPUT`))
    return axios.put(`${HOST}/api/appointments/${id}`, { interview: { ...interview } })
      .then((value) => {
        setState({ ...state, appointments })
      })
      .catch((err) => console.log('ERROR', err))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`${HOST}/api/appointments/${id}`)
    .then((value) => {
      setState({ ...state, appointments })
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
