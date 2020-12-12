// selectors.js

export const getAppointmentsForDay = function (state, day) {
  const filteredDays = state.days.filter(current => current.name === day);
  const result = filteredDays.length <= 0 ? [] : filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  })
  return result
}

/*
{
  "student": "Lydia Miller-Jones",
  "interviewer": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
 */
export const getInterview = function (state, interview) {
  //console.log('state', state)
  //console.log('interview', interview)
  return !interview ? null : {
    "student": "Lydia Miller-Jones",
    "interviewer": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
  }
}
