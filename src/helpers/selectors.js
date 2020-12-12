// selectors.js

export const getAppointmentsForDay = function (state, day) {
  const filteredDays = state.days.filter(current => current.name === day);
  console.log('filteredDays', filteredDays)
  return filteredDays.length <= 0 ? [] : filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  })
}
