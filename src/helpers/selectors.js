// selectors.js

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(current => current.name === day);
  const result = filteredDays.length <= 0 ? [] : filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  })
  return result
}

export function getInterview(state, interview) {
  return !interview ? null : {
    ...interview,
    "interviewer": state.interviewers[interview.interviewer]
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(current => current.name === day);
  const result = filteredDays.length <= 0 ? [] : filteredDays[0].interviewers.map((id) => {
    return state.interviewers[id];
  })
  return result
}
