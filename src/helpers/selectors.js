// selectors.js

export const getAppointmentsForDay = function (state, day) {
  const filteredDays = state.days.filter(current => current.name === day);
  const result = filteredDays.length <= 0 ? [] : filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  })
  return result
}

export const getInterview = function (state, interview) {
  return !interview ? null : {
    ...interview,
    "interviewer": state.interviewers[interview.interviewer]
  }
}
